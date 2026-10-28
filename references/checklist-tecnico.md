# Checklist técnico

## 1. HTML sem depender de JavaScript
Robôs de IA (OAI-SearchBot, Claude-SearchBot, PerplexityBot) em geral não rodam JavaScript. Teste: `curl -s URL | grep -c "<h1"` e o verificador ("palavras visíveis sem JavaScript"). Site de página única (Vite/React puro, Lovable) chega vazio: pré-renderizar no build, usar Next/Astro com SSG, ou no mínimo um `<noscript>` com o texto principal. Conteúdo dentro de aba, carrossel ou SVG também precisa estar no HTML inicial.

Receita de pré-renderização para Vite + React (arquivos `src/entry-server.tsx`, `scripts/prerender.mjs`, `scripts/gerar-sitemap.mjs`):
1. `src/entry-server.tsx` exporta `render(rota)` com `renderToString` dentro de `StaticRouter` (e `HelmetProvider` se usar react-helmet-async), mais a lista de rotas.
2. Build em dois passos: `vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`.
3. `prerender.mjs` lê `dist/index.html`, troca `<div id="root"></div>` pelo HTML da rota e `</head>` pelos metadados, e grava `dist/<rota>/index.html`. Usar `replace` com função (texto com `$` quebra).
4. O `main.tsx` usa `hydrateRoot` quando o `#root` já tem conteúdo.
5. Teste que lê o `dist`: cada rota tem h1, canônico, og:image absoluta e JSON-LD válido.
Cuidado com reescrita de SPA: na Vercel, `/sitemap.xml` e `/robots.txt` inexistentes devolvem o `index.html` com status 200. Conferir o conteúdo (`curl -s URL | head -3`), não só o status.

## 2. robots.txt por finalidade
Separar busca de treino. Liberar busca é o que faz ser citado; bloquear treino é decisão de licenciamento e não afeta a citação.

```
# Busca e citação nas IAs (liberado)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /

# Treino de modelos (liberado: ajuda o modelo a conhecer a marca; trocar para Disallow se não quiser)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://DOMINIO/sitemap.xml
```
Armadilhas: o Cloudflare tem "Block AI bots" e "AI Labyrinth" que bloqueiam no servidor ou injetam regras no robots servido (o arquivo do repositório não mostra). O verificador testa a página com user-agent do GPTBot e do ClaudeBot. `Disallow:` vazio libera tudo; `Disallow: /` bloqueia tudo. ChatGPT-User e Perplexity-User podem ignorar o robots.

## 3. sitemap.xml
Todas as páginas indexáveis, sem as `noindex`, com `<lastmod>` real. Declarado no robots. Enviar no Search Console e no Bing Webmaster (o Bing alimenta o ChatGPT e o Copilot). IndexNow opcional: chave em `/<chave>.txt` na raiz.

## 4. Metadados por página
`<html lang>`, `<title>` único, `meta description` que responde o que é a página, `link rel=canonical` absoluto, `og:title`, `og:description`, `og:image` absoluta, `og:url` igual ao canônico, `twitter:card`. Um `h1` por página e títulos em ordem.

## 5. JSON-LD (no HTML inicial, nunca injetado só por JS)
Ligar tudo por `@id` (ex.: `https://dominio/#organizacao`). O JSON-LD precisa dizer o mesmo que a tela.

| Página | Tipos |
|---|---|
| Home de empresa | `Organization` ou `ProfessionalService` (`@id`, name, url, logo, description, `sameAs`, areaServed, contactPoint, `knowsAbout`) + `WebSite` |
| Serviço | `Service` com `provider` = `@id` da organização + `BreadcrumbList` |
| Artigo | `Article` com `author` (`Person` com url e `sameAs`), `datePublished`, `dateModified`, `image` absoluta, `publisher` = organização |
| Página de autor ou perfil pessoal | `Person` (jobTitle, worksFor, knowsAbout, `sameAs`) + `ProfilePage` |
| App ou SaaS | `SoftwareApplication` (applicationCategory, operatingSystem, offers só se o preço for real) |
| Perguntas | `FAQPage` igual ao FAQ visível (não gera estrela no Google, mas ajuda a IA a ler) |

Modelos prontos em `../templates/jsonld.md`. Obsoletos: HowTo, SpecialAnnouncement. Nunca `aggregateRating` sem avaliação real publicada.

## 6. llms.txt
Gerar em `/llms.txt` (formato em `../templates/llms.txt`): `# Nome`, `> resumo`, seções `##` com links absolutos e uma linha de descrição, fatos principais e contato. Opcional `/llms-full.txt` com o texto completo. Custa pouco; não é alavanca.

## 7. Links internos
Blog ligado às páginas de serviço e vice-versa; menu com âncoras que existem; nada quebrado.

## 8. Publicar e indexar (só com autorização do usuário naquela vez)
1. **Deploy** pelo caminho do projeto (Vercel por CLI: `vercel build --prod` e `vercel deploy --prebuilt --prod`). Antes do domínio, conferir tudo no endereço da hospedagem (`*.vercel.app`).
2. **DNS é sempre o usuário quem troca** (o agente não mexe em DNS). Passar o passo a passo: registro A do domínio e do `www` para o IP da hospedagem (Vercel: o IP que o painel mostrar, em geral `76.76.21.21`), nuvem cinza ("somente DNS") na Cloudflare, sem mexer em MX e TXT (e-mail e verificações).
3. **Conferir a troca nos servidores do próprio DNS** (`nslookup dominio <ns da cloudflare>`), não no cache do Windows: logo depois da troca o computador ainda pode mandar para o IP antigo e mostrar erro 525. Testar com `curl --resolve dominio:443:<ip novo> https://dominio/`.
4. **Certificado:** na Vercel sai sozinho em minutos; para forçar, `vercel certs issue dominio www.dominio`. Conferir o redirecionamento `www` para o endereço sem www (308).
5. **Conferência no endereço oficial:** todas as URLs do sitemap respondem 200, página inexistente dá 404, `verificar-geo.mjs` no domínio, robô GPTBot entra.
6. **Google Search Console:** ver se a propriedade já existe (de domínio, verificada por TXT no DNS); reenviar o sitemap e pedir indexação da home e das páginas novas (Inspeção de URL, botão "Solicitar indexação", cerca de 10 por dia). A URL direta da inspeção dá 404: usar a caixa de busca do topo.
7. **IndexNow (Bing, que alimenta ChatGPT e Copilot):** chave aleatória em `/<chave>.txt` na raiz; a cada publicação, POST com a lista do sitemap:
   `curl -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json; charset=utf-8" -d '{"host":"dominio","key":"<chave>","keyLocation":"https://dominio/<chave>.txt","urlList":[...]}'` (200 ou 202 = recebido). Bing Webmaster Tools pede login do usuário: opcional.
8. **Depois:** desligar a hospedagem antiga só com o usuário; testar o formulário de contato em produção só com autorização (é envio de dado).

## 9. Testes que ficam no projeto
Cada item acima vira um teste no build quando o projeto tem testes: HTML pré-renderizado com h1, canônico, og absoluto, JSON-LD válido, sitemap sem noindex, robots com os robôs de IA.

## 10. SaaS ou sistema com login
1. **Mapear rotas:** listar as rotas do roteador do código e separar públicas (entrada, preços, documentação, changelog, termos) de privadas (tudo atrás de login, inclusive `/login`, `/cadastro`, `/recuperar-senha`).
2. **Privadas:** `noindex` em cada uma (meta `robots` ou cabeçalho `X-Robots-Tag: noindex`) e fora do sitemap. Não usar `Disallow` no robots para elas (o robô não lê o noindex de página bloqueada).
3. **Públicas:** HTML com texto sem JS, canônico em cada uma (inclusive na rota para onde `/` redireciona), JSON-LD `SoftwareApplication` com `offers` só se o preço for real, sitemap só com elas.
4. **robots.txt servido x do repositório:** `curl -s https://dominio/robots.txt` e comparar com o arquivo do projeto. Se a Cloudflare serve outro (robots gerenciado, "Block AI bots", content signals), anotar e passar ao usuário o ajuste no painel; o agente não mexe na Cloudflare.
5. **Nunca** liberar robô, criar conta de teste ou entrar com senha para "ver" a parte logada em produção.
