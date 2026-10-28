#!/usr/bin/env node
// Nota de 0 a 10 de quanto uma página está pronta para ser lida e citada por IA (ChatGPT, Claude, Perplexity, Gemini).
// Só faz GET em páginas públicas; não manda dado para fora nem precisa de chave.
// Uso: node verificar-geo.mjs https://site.com [https://site.com/outra-pagina ...] [--lista urls.txt] [--md relatorio.md]
// Testes: node --test verificar-geo.test.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Robôs que buscam e citam na hora da pergunta (contam na nota) e robôs de treino (só informados).
export const ROBOS_BUSCA = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'];
export const ROBOS_TREINO = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

// Regras do robots.txt para a raiz "/": o grupo com o nome do robô vence o grupo "*"; regra mais longa vence; empate fica com Allow.
export function robotPodeLer(texto, robo) {
  const grupos = [];
  let atual = null;
  let lendoAgentes = false;
  for (const bruta of (texto || '').split(/\r?\n/)) {
    const linha = bruta.replace(/#.*/, '').trim();
    const m = linha.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const [, chave, valor] = [m[0], m[1].toLowerCase(), m[2].trim()];
    if (chave === 'user-agent') {
      if (!lendoAgentes) { atual = { agentes: [], regras: [] }; grupos.push(atual); }
      atual.agentes.push(valor.toLowerCase());
      lendoAgentes = true;
    } else if ((chave === 'allow' || chave === 'disallow') && atual) {
      atual.regras.push({ permitir: chave === 'allow', caminho: valor });
      lendoAgentes = false;
    } else {
      lendoAgentes = false;
    }
  }
  const nome = robo.toLowerCase();
  const proprios = grupos.filter((g) => g.agentes.some((a) => a !== '*' && nome.includes(a)));
  const usados = proprios.length ? proprios : grupos.filter((g) => g.agentes.includes('*'));
  let melhor = null;
  for (const r of usados.flatMap((g) => g.regras)) {
    if (r.caminho === '' || !'/'.startsWith(r.caminho.replace(/\*$/, ''))) continue; // Disallow vazio não bloqueia nada
    if (!melhor || r.caminho.length > melhor.caminho.length || (r.caminho.length === melhor.caminho.length && r.permitir)) melhor = r;
  }
  return melhor ? melhor.permitir : true;
}

const atributo = (html, regex) => (html.match(regex)?.[1] ?? '').trim();

// O que um robô vê sem rodar JavaScript.
export function lerPagina(html) {
  const tiposJsonLd = [];
  let jsonLdQuebrado = 0;
  for (const [, bloco] of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const dado = JSON.parse(bloco);
      const itens = [dado].flat().flatMap((d) => (d && d['@graph'] ? d['@graph'] : [d]));
      for (const item of itens) for (const t of [item?.['@type']].flat()) if (t) tiposJsonLd.push(t);
    } catch {
      jsonLdQuebrado++;
    }
  }
  const corpo = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html)
    .replace(/<(script|style|svg|template)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
  return {
    titulo: atributo(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    descricao: atributo(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    canonico: atributo(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    lang: atributo(html, /<html[^>]+lang=["']([^"']+)["']/i),
    h1: (html.match(/<h1[\s>]/gi) || []).length,
    palavras: (corpo.match(/[\p{L}\p{N}]+/gu) || []).length,
    tiposJsonLd,
    jsonLdQuebrado,
  };
}

// Pesos (somam 10): robôs de busca 2, servidor sem bloqueio 1, sitemap 1, texto sem JS 2,5,
// título + descrição + canônico 1, um h1 0,5, idioma 0,5, JSON-LD válido 1,5.
// llms.txt é só informado: nenhum provedor confirmou que usa e o Google diz que ignora (estudo dos repos, 27/10/2026).
export function nota({ robotsBusca, robotsTotal, sitemap, bloqueioServidor, pagina: p }) {
  const pontos =
    2 * (robotsBusca / robotsTotal) +
    (bloqueioServidor ? 0 : 1) +
    (sitemap ? 1 : 0) +
    2.5 * Math.min(p.palavras / 300, 1) +
    [p.titulo, p.descricao, p.canonico].filter(Boolean).length / 3 +
    (p.h1 === 1 ? 0.5 : 0) +
    (p.lang ? 0.5 : 0) +
    (p.tiposJsonLd.length && !p.jsonLdQuebrado ? 1.5 : 0);
  return Math.round(pontos * 10) / 10;
}

const NAVEGADOR = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const COMO_GPTBOT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)';
const COMO_CLAUDE = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)';

async function baixar(url, ua = NAVEGADOR) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': ua }, redirect: 'follow', signal: AbortSignal.timeout(20000) });
    return { status: r.status, texto: await r.text() };
  } catch (e) {
    return { status: 0, texto: '', erro: e.message };
  }
}
const ehHtml = (t) => /^\s*<(!doctype|html)/i.test(t); // site de página única devolve o index.html para qualquer endereço

export async function avaliar(url) {
  const origem = new URL(url).origin;
  const [pagina, robots, llms] = await Promise.all([baixar(url), baixar(`${origem}/robots.txt`), baixar(`${origem}/llms.txt`)]);
  const textoRobots = robots.status === 200 && !ehHtml(robots.texto) ? robots.texto : '';
  const enderecoSitemap = textoRobots.match(/^\s*sitemap:\s*(\S+)/im)?.[1] ?? `${origem}/sitemap.xml`;
  const [sitemap, gptbot, claudebot] = await Promise.all([baixar(enderecoSitemap), baixar(url, COMO_GPTBOT), baixar(url, COMO_CLAUDE)]);
  const bloqueado = (r) => pagina.status === 200 && (r.status !== 200 || /cf-chl|challenge-platform|Just a moment/i.test(r.texto));
  const dados = {
    url,
    status: pagina.status,
    robotsTotal: ROBOS_BUSCA.length,
    robotsBusca: ROBOS_BUSCA.filter((r) => robotPodeLer(textoRobots, r)).length,
    treinoBloqueado: ROBOS_TREINO.filter((r) => !robotPodeLer(textoRobots, r)),
    llms: llms.status === 200 && !ehHtml(llms.texto) && /^\s*#\s/.test(llms.texto),
    sitemap: sitemap.status === 200 && /<loc>/i.test(sitemap.texto),
    urlsSitemap: (sitemap.texto.match(/<loc>/gi) || []).length,
    bloqueioServidor: bloqueado(gptbot) || bloqueado(claudebot),
    pagina: lerPagina(pagina.texto),
  };
  return { ...dados, nota: pagina.status === 200 ? nota(dados) : 0 };
}

export function relatorio(r) {
  const p = r.pagina;
  const sim = (v) => (v ? 'sim' : 'NÃO');
  return [
    `### ${r.url}  nota ${r.nota}/10`,
    '',
    '| Item | Resultado |',
    '|---|---|',
    `| Página responde | ${r.status} |`,
    `| Robôs de busca de IA liberados no robots.txt | ${r.robotsBusca} de ${r.robotsTotal} |`,
    `| Robôs de treino bloqueados (informativo) | ${r.treinoBloqueado.join(', ') || 'nenhum'} |`,
    `| Servidor deixa GPTBot e ClaudeBot entrarem | ${sim(!r.bloqueioServidor)} |`,
    `| /llms.txt (informativo) | ${sim(r.llms)} |`,
    `| sitemap | ${r.sitemap ? `sim, ${r.urlsSitemap} endereços` : 'NÃO'} |`,
    `| Palavras visíveis sem JavaScript | ${p.palavras}${p.palavras < 300 ? ' (pouco: a página depende de JS?)' : ''} |`,
    `| Título / descrição / canônico | ${sim(p.titulo)} / ${sim(p.descricao)} / ${sim(p.canonico)} |`,
    `| h1 | ${p.h1} |`,
    `| Idioma | ${p.lang || 'NÃO'} |`,
    `| JSON-LD | ${p.tiposJsonLd.join(', ') || 'nenhum'}${p.jsonLdQuebrado ? ` (${p.jsonLdQuebrado} bloco quebrado)` : ''} |`,
    '',
  ].join('\n');
}

// Arquivo de lista: uma URL por linha; "#" comenta (linha inteira ou o resto da linha).
export const lerLista = (texto) => texto.split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean);

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const i = args.indexOf('--md');
  const arquivo = i >= 0 ? args.splice(i, 2)[1] : null;
  const l = args.indexOf('--lista');
  if (l >= 0) args.push(...lerLista(readFileSync(args.splice(l, 2)[1], 'utf8')));
  if (!args.length) {
    console.error('Uso: node verificar-geo.mjs https://site.com [mais urls] [--lista urls.txt] [--md relatorio.md]');
    process.exit(1);
  }
  const partes = [`# Verificação GEO (${new Date().toISOString().slice(0, 10)})`, ''];
  for (const url of args) partes.push(relatorio(await avaliar(url)));
  const texto = partes.join('\n');
  console.log(texto);
  if (arquivo) writeFileSync(arquivo, texto);
}
