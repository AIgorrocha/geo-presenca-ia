// Testes das partes que decidem a nota (rodar: node --test verificar-geo.test.mjs)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { robotPodeLer, lerPagina, nota } from './verificar-geo.mjs';

const robots = `
User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: CCBot
User-agent: ClaudeBot
Disallow: /privado
Allow: /
`;

test('robots: grupo próprio vence o grupo *, e Disallow: / bloqueia', () => {
  assert.equal(robotPodeLer(robots, 'GPTBot'), false);
  assert.equal(robotPodeLer(robots, 'PerplexityBot'), true); // cai no *
  assert.equal(robotPodeLer(robots, 'ClaudeBot'), true); // grupo com dois user-agents
});

test('robots: sem robots.txt tudo é permitido; Disallow vazio também', () => {
  assert.equal(robotPodeLer('', 'GPTBot'), true);
  assert.equal(robotPodeLer('User-agent: *\nDisallow:\n', 'GPTBot'), true);
  assert.equal(robotPodeLer('User-agent: *\nDisallow: /\n', 'OAI-SearchBot'), false);
});

test('página: lê título, h1, descrição, canônico e JSON-LD, e acusa JSON quebrado', () => {
  const html = `<!doctype html><html lang="pt-BR"><head><title>Visão</title>
  <meta name="description" content="Projetos BIM">
  <link rel="canonical" href="https://x.com/">
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"V"},{"@type":"FAQPage","mainEntity":[{"@type":"Question"}]}]}</script>
  <script type="application/ld+json">{quebrado</script>
  </head><body><h1>Sua obra</h1><p>${'palavra '.repeat(300)}</p><script>var x = 1</script></body></html>`;
  const p = lerPagina(html);
  assert.equal(p.titulo, 'Visão');
  assert.equal(p.h1, 1);
  assert.equal(p.descricao, 'Projetos BIM');
  assert.equal(p.canonico, 'https://x.com/');
  assert.equal(p.lang, 'pt-BR');
  assert.deepEqual(p.tiposJsonLd.sort(), ['FAQPage', 'Organization']);
  assert.equal(p.jsonLdQuebrado, 1);
  assert.ok(p.palavras >= 300 && p.palavras < 310, `palavras: ${p.palavras}`);
});

test('nota: site sem nada fica perto de zero; site completo chega a 10', () => {
  const vazio = { robotsBusca: 0, robotsTotal: 6, llms: false, sitemap: false, bloqueioServidor: true,
    pagina: { titulo: '', descricao: '', canonico: '', h1: 0, palavras: 20, tiposJsonLd: [], jsonLdQuebrado: 0, lang: '' } };
  const cheio = { robotsBusca: 6, robotsTotal: 6, llms: true, sitemap: true, bloqueioServidor: false,
    pagina: { titulo: 't', descricao: 'd', canonico: 'c', h1: 1, palavras: 900, tiposJsonLd: ['Organization', 'FAQPage'], jsonLdQuebrado: 0, lang: 'pt-BR' } };
  assert.ok(nota(vazio) <= 1, `vazio: ${nota(vazio)}`);
  assert.equal(nota(cheio), 10);
});

test('nota: llms.txt é informativo e não mexe na nota (nenhuma IA confirmou que usa)', () => {
  const base = { robotsBusca: 6, robotsTotal: 6, sitemap: true, bloqueioServidor: false,
    pagina: { titulo: 't', descricao: 'd', canonico: 'c', h1: 1, palavras: 900, tiposJsonLd: ['Organization'], jsonLdQuebrado: 0, lang: 'pt-BR' } };
  assert.equal(nota({ ...base, llms: false }), nota({ ...base, llms: true }));
});

test('lerLista: uma URL por linha, ignora linha vazia e comentário', async () => {
  const { lerLista } = await import('./verificar-geo.mjs');
  const texto = '# Visão\nhttps://visaoprojetosbim.com/\n\n  https://igorrocha.vercel.app/  # portfólio\n# https://desligado.com\n';
  assert.deepEqual(lerLista(texto), ['https://visaoprojetosbim.com/', 'https://igorrocha.vercel.app/']);
});
