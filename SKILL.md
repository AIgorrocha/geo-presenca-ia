---
name: geo-presenca-ia
description: Faz um site, app, landing page, sistema ou perfil ser lido e CITADO por ChatGPT, Claude, Perplexity e Gemini (LLM SEO / GEO), e mantém isso atualizado com uma rotina mensal. Use quando o usuário disser "LLM SEO", "GEO", "aparecer no ChatGPT", "ser citado pela IA", "llms.txt", "robots para IA", "otimizar meu site/perfil para IA", "rodar a rotina de GEO", "conferir presença nas IAs", ou ao publicar site ou página nova. Não use para SEO de anúncio pago.
---

# Presença nas IAs (LLM SEO / GEO)

Criada por Igor Rocha a partir do roteiro "faça seu site ser citado pelo ChatGPT, Claude e Perplexity", do estudo dos repositórios `AgriciDaniel/claude-seo` e `zubair-trabzada/geo-seo-claude`, e da aplicação em sites reais (exemplo no ar: `https://visaoprojetosbim.com`).

Três modos: **aplicar num site ou app**, **aplicar num perfil**, **rotina mensal**. A lista de tudo o que o usuário tem na internet fica em `inventario.md` (preencher na primeira vez).

## Regras (valem nos três modos)
- Nunca inventar dado, avaliação, autor, preço, prazo, endereço ou cliente. Faltou: `TODO` dizendo quem responde.
- Sem nome de cliente ou órgão sem autorização (LGPD). Sem travessão no texto publicado (deixa cara de texto de IA).
- Não mudar design nem URL sem perguntar. Texto que o usuário escreveu e quer manter não se reescreve.
- Mudança em código: branch própria (`llm-seo`), teste que falha antes e passa depois, build e testes verdes. Sem deploy, push, DNS ou postagem sem autorização no momento.
- Perfil: o agente prepara o texto e a lista do que mudar; quem publica é o usuário (ou o agente com autorização explícita daquela vez).
- llms.txt se cria porque custa pouco, mas não é alavanca: nenhuma IA confirmou que lê. Nunca vender como.
- **Proibido sem pedido explícito do usuário naquela tarefa:** deploy, push, DNS (sempre o usuário), enviar formulário, publicar ou editar perfil, mexer em conta (Search Console, Bing, Google Business, redes), criar conta, entrar com senha, ler arquivo de senhas ou credenciais. O pedido "pode publicar" cobre deploy, Search Console e IndexNow daquele site, e nada além.
- Não mexer em pixel, GTM, GA4 ou outro rastreamento que já exista: só preservar.

## Modo 1: aplicar num site ou app
1. **Descoberta.** Primeiro achar o código: a pasta local e o projeto de hospedagem do endereço (coluna "Código" do `inventario.md`; se estiver vazia, procurar o domínio nas pastas de projeto do usuário com `grep -rl "<dominio>" --include=package.json --include=vercel.json --include=project.json` e em `.vercel/project.json`, ou `vercel project ls`; não achou, perguntar ao usuário e anotar no inventário). Depois: stack, como renderiza (o HTML chega pronto ou só depois do JS?), páginas, negócio, público, tipo de alvo (tabela abaixo). Escreva 20 perguntas que um cliente faria a uma IA onde esse site deveria ser a resposta (`templates/PERGUNTAS-TESTE.md`).
2. **Prompt do site.** Preencha `templates/PROMPT-BASE.md` com o contexto e salve em `llm-seo/PROMPT.md` no repositório. Mostre ao usuário (se ele já pediu para seguir direto, siga e mostre no fim).
3. **Nota de partida e linha de base.** `node scripts/verificar-geo.mjs <url>` (parte técnica automática) + régua completa de `references/regua.md`. Em paralelo, um subagente roda as 20 perguntas por busca na web e grava `llm-seo/MEDICAO-AAAA-MM-DD.md` (C, M ou -, e os 3 primeiros domínios de cada uma). Auditoria técnica e de conteúdo também podem ir a subagentes, cada um dono de um arquivo.
4. **Fatos com o dono.** Antes de escrever, liste o que só o dono sabe e pergunte de uma vez. Empresa: preço ou forma de cobrar, prazo típico, razão social e CNPJ, anos de experiência, endereço ou só área atendida. Pessoa: cargo, frase de "quem é", site canônico, links de LinkedIn, GitHub, YouTube e Instagram. SaaS ou app: para quem é, preço real ou "sob consulta", quais rotas são públicas. Kit ou material: se deve ser achado e por quem. Sem resposta, o campo fica `TODO` e o trabalho segue no resto. CNPJ se confere na Receita (`https://brasilapi.com.br/api/cnpj/v1/<só números>`); páginas legais, rodapé e JSON-LD precisam mostrar o mesmo.
5. **Implementação** (`references/checklist-tecnico.md` e `references/conteudo-citavel.md`): HTML sem depender de JS (pré-renderizar se for SPA), robots.txt por finalidade, sitemap, metadados, JSON-LD igual ao que está na tela, `/llms.txt`, aberturas answer-first (mostrar antes e depois), FAQ cobrindo as lacunas das 20 perguntas.
6. **Conteúdo novo** (artigos que respondem as perguntas sem resposta): brief de `templates/BRIEF-ARTIGO.md` para um subagente por lote; o condutor confere cada afirmação contra a fonte antes de publicar, tira qualquer `TODO` do texto e põe capa com imagem real do trabalho (sem placa ou nome de cliente, arquivo com nome novo). Teste: artigo novo no sitemap e no llms.txt, sem `TODO` nem travessão.
7. **Fora do site:** kit de perfis em `llm-seo/KIT-PERFIS.md` a partir de `templates/KIT-PERFIS.md` (Google, LinkedIn, Instagram, YouTube, com limite de caracteres e calendário que reaproveita posts que a marca já fez). Plano completo em `references/perfis-e-fora-do-site.md`.
8. **Publicar e indexar** (só com autorização do usuário; passo a passo em `references/checklist-tecnico.md`, seção 8): deploy, DNS pelo usuário, certificado, conferência no endereço oficial, Search Console (sitemap e pedido de indexação), IndexNow para o Bing.
9. **Fechamento.** Build e testes; `llm-seo/RELATORIO.md` com nota antes e depois, situação da publicação, mudanças, TODOs e roteiro de 90 dias; atualizar `inventario.md`, `urls.txt` e o histórico do mês. A rodada nas quatro IAs fica para 2 a 4 semanas depois da publicação, quando Google e Bing já leram o site novo.

## Tipos de alvo (o que muda em cada um)
| Alvo | O que vale | Cuidado |
|---|---|---|
| Site institucional ou de serviço | tudo do Modo 1; JSON-LD `ProfessionalService` ou `Organization` | exemplo no ar: `https://visaoprojetosbim.com` |
| Landing page de anúncio | robots, metadados, JSON-LD, texto sem JS; perguntas de teste só se ela deve ser achada | se é só para anúncio, pode ficar fora do sitemap |
| SaaS ou sistema com login | só a parte pública conta: página de entrada, preços, documentação, changelog; `SoftwareApplication` | roteiro na seção 10 do `references/checklist-tecnico.md` |
| App de celular | página da loja (título, descrição answer-first, capturas) vale como perfil; site de apoio com `SoftwareApplication` e link da loja | texto da loja segue a mesma entidade |
| Portfólio ou site pessoal | `Person` + `ProfilePage`, `sameAs` com LinkedIn, GitHub, YouTube; artigos com autor ligado a ele | é onde a IA lê "quem é você": prioridade se chega vazio sem JS |
| Kit, curso ou material gratuito | perguntar ao usuário se deve ser achado. Sim: robots.txt, sitemap, canônico, título e descrição, `CreativeWork` (ou `Course`/`Event`) com o autor certo, e a página explica em texto o que tem no arquivo para baixar. Não: `noindex` e fora do inventário de citação | robots.txt 404 conta como liberado, mas criar o arquivo mesmo assim |
| Perfil em rede social | Modo 2 | quem publica é o usuário |

Como pré-renderizar por stack: Vite/React puro (`entry-server.tsx` + `scripts/prerender.mjs`, receita na seção 1 do `references/checklist-tecnico.md`); Next.js (páginas estáticas ou SSR, nada de conteúdo só no cliente); Astro e HTML estático já chegam prontos; Lovable (exportar o código e pré-renderizar, ou migrar para Vercel); WordPress (plugin de SEO para metadados e JSON-LD, conferir se cache e firewall não bloqueiam robô de IA).

## Modo 2: aplicar num perfil (Instagram, LinkedIn, YouTube, Google, GitHub...)
Siga a seção do perfil em `references/perfis-e-fora-do-site.md`: nome e descrição iguais à entidade, link para o site certo, categoria, `sameAs` de volta no JSON-LD do site, primeiro parágrafo answer-first. Entregue o texto pronto para colar e a lista de campos; marque no `inventario.md`.

## Modo 3: rotina mensal (primeira segunda-feira do mês, ou quando o usuário pedir)
Passo a passo em `rotina.md`. Resumo: rodar o verificador em todas as URLs do inventário (`node scripts/verificar-geo.mjs --lista urls.txt --md historico/AAAA-MM.md`), comparar com o mês anterior, repetir as 20 perguntas de cada marca nas quatro IAs, atualizar data e conteúdo das páginas que caíram, e trimestralmente revisar perfis e `sameAs`.

## Arquivos
| Arquivo | Para quê |
|---|---|
| `references/regua.md` | Régua de 0 a 10 em seis dimensões |
| `references/checklist-tecnico.md` | robots.txt por finalidade, sitemap, metadados, JSON-LD por tipo de página, llms.txt, armadilhas |
| `references/conteudo-citavel.md` | answer-first, trechos citáveis, FAQ, autor e data |
| `references/perfis-e-fora-do-site.md` | Checklist por plataforma e plano fora do site |
| `templates/` | Prompt base, 20 perguntas, robots.txt, llms.txt, JSON-LD, kit de perfis, brief de artigo |
| `templates/PROMPT-SESSAO.md` | Prompts prontos para colar numa sessão nova (aplicar num site, rotina, perfis, artigo) |
| `scripts/verificar-geo.mjs` | Nota técnica automática (só GET em página pública). Testes: `node --test scripts/verificar-geo.test.mjs` |
| `inventario.md` e `urls.txt` | Tudo o que o usuário tem na internet e o estado de cada um (preencher) |
| `rotina.md` e `historico/` | Rotina mensal e relatórios guardados |
