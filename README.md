# geo-presenca-ia: faça as IAs indicarem o seu negócio

**geo-presenca-ia** é uma skill gratuita, em português, para Claude Code e Codex, que prepara o seu site, app, sistema ou perfil para ser lido e citado pelo ChatGPT, Claude, Perplexity e Gemini quando alguém pergunta sobre o que você faz. Ela dá uma nota de 0 a 10, corrige o código com a sua autorização, escreve os textos dos seus perfis e mantém tudo em dia com uma rotina mensal. Criada por Igor Rocha e testada em sites reais.

## Por que isso importa

Cada vez mais gente pergunta para uma IA em vez de procurar no Google: "quem faz projeto BIM no Brasil?", "qual aplicativo controla gasto de obra?". A IA responde citando poucas fontes. Se o robô dela abre o seu site e encontra uma página em branco (o que acontece com muitos sites feitos em React, Vite ou Lovable), sem uma frase clara de quem você é e sem dados organizados, você não entra na resposta.

Preparar o site e os perfis para esse leitor novo se chama **GEO** (Generative Engine Optimization) ou **LLM SEO**. É isso que a skill faz, passo a passo.

## O que ela faz

| Modo | Quando usar | O que você recebe |
|---|---|---|
| **1. Site, app ou sistema** | site institucional, landing page, SaaS, app, portfólio, curso ou material gratuito | nota de partida, 20 perguntas de teste, correções no código, artigos novos e relatório com a nota antes e depois |
| **2. Perfil** | Perfil de Empresa no Google, LinkedIn, Instagram, YouTube, GitHub | textos prontos para colar, dentro do limite de caracteres de cada rede, todos dizendo a mesma coisa sobre você |
| **3. Rotina mensal** | primeira segunda-feira do mês, ou quando quiser | nota de todas as suas páginas comparada com o mês anterior, as 20 perguntas refeitas nas quatro IAs e a lista do que caiu e do que fazer |

### O que muda no site (Modo 1)

1. **Texto legível sem JavaScript.** Os robôs de IA em geral não rodam JavaScript. Se o seu site só mostra conteúdo depois que o navegador monta a página, a skill pré-renderiza (gera o HTML pronto no build).
2. **robots.txt por finalidade.** Libera os robôs que buscam e citam (OAI-SearchBot, Claude-SearchBot, PerplexityBot e outros) e deixa você decidir sobre os robôs de treino.
3. **sitemap.xml** com todas as páginas que devem ser achadas.
4. **Metadados** (título, descrição, endereço canônico, imagem de compartilhamento) em cada página.
5. **Dados estruturados (JSON-LD)**: um cartão de identidade da sua marca, escondido no código, que a IA lê para entender quem você é, o que faz e quais são os seus perfis oficiais. Sempre igual ao que aparece na tela.
6. **Textos "resposta primeiro"**: as duas primeiras frases de cada página respondem o quê, para quem e como, com o nome da marca. São esses trechos curtos que a IA copia na resposta.
7. **FAQ** cobrindo as perguntas de teste que o site ainda não respondia.
8. **Artigos novos** para as perguntas sem resposta, sem inventar número nem cliente.
9. **llms.txt**, um resumo do site para IAs. Custa pouco, mas nenhuma IA confirmou que lê: a skill cria e não vende isso como solução.
10. **Publicação e indexação**, só quando você autoriza: deploy, Google Search Console e IndexNow (Bing, que alimenta o ChatGPT e o Copilot). O DNS fica sempre com você.

### Como ela mede

- **Nota técnica de 0 a 10**, automática, pelo verificador que vem junto (`scripts/verificar-geo.mjs`).
- **Régua completa de 0 a 10** em seis dimensões: acesso e técnica, conteúdo citável, entidade e JSON-LD, autoridade fora do site, autor e atualização, multimídia.
- **20 perguntas de teste** que um cliente faria a uma IA, conferidas no ChatGPT, Claude, Perplexity e Gemini: cita com link, menciona sem link ou não aparece.

## Resultado real

| Site | Nota técnica antes | Nota técnica depois |
|---|---|---|
| [visaoprojetosbim.com](https://visaoprojetosbim.com) (Visão Projetos BIM) | 5,5: a página chegava em branco sem JavaScript | 10: 1.888 palavras legíveis, JSON-LD de empresa, site e FAQ |
| [mediaobra.app](https://mediaobra.app) (medIAobra) | 7 | 10: 3.592 palavras legíveis, JSON-LD de empresa, aplicativo e FAQ |

Notas depois medidas em 28/10/2026 com o verificador da skill. A nota técnica mostra que o site está pronto para ser lido. A citação nas IAs se mede com as 20 perguntas de 2 a 4 semanas depois de publicar, quando Google e Bing já leram o site novo.

## Instalar

Você precisa do [Claude Code](https://claude.com/claude-code) ou do Codex, e do [Git](https://git-scm.com). O verificador usa [Node.js](https://nodejs.org) 18 ou mais novo.

**Jeito mais fácil:** abra o seu agente e cole:

```
Instale a skill https://github.com/AIgorrocha/geo-presenca-ia na minha pasta de skills.
```

**Claude Code, no Mac ou Linux:**

```bash
git clone https://github.com/AIgorrocha/geo-presenca-ia.git ~/.claude/skills/geo-presenca-ia
```

**Claude Code, no Windows (PowerShell):**

```powershell
git clone https://github.com/AIgorrocha/geo-presenca-ia.git "$HOME\.claude\skills\geo-presenca-ia"
```

**Codex e outros agentes que usam o padrão Agent Skills:** clone na pasta de skills do agente (no Codex, `~/.agents/skills/geo-presenca-ia`).

**claude.ai (navegador ou app):** baixe o `geo-presenca-ia.zip` na página de [Releases](https://github.com/AIgorrocha/geo-presenca-ia/releases) e envie na área de Skills das configurações. No claude.ai ela orienta e escreve os textos e arquivos para você colar; no Claude Code e no Codex ela trabalha direto no código do site.

Depois de instalar, abra uma sessão nova. A skill entra sozinha quando você fala em "GEO", "LLM SEO", "aparecer no ChatGPT" ou "ser citado pela IA".

**Atualizar:** `git -C ~/.claude/skills/geo-presenca-ia pull`

## Como usar

Abra o agente na pasta do código do seu site e cole (trocando o que está entre chaves):

```
Use a skill geo-presenca-ia no Modo 1 neste projeto ({nome}, endereço {url}).
Objetivo: ser lido e citado por ChatGPT, Claude, Perplexity e Gemini quando perguntarem sobre {tema} {onde}.
Público: {quem compra}. Fatos que eu confirmo: {preço ou forma de cobrar, prazo típico, CNPJ, cidade, anos de experiência}.
Pergunte de uma vez só o que só eu sei. Trabalhe na branch llm-seo, com teste, build e relatório em llm-seo/RELATORIO.md.
Não publique, só prepare. DNS fica comigo.
No fim, me diga em linguagem simples o que mudou, a nota antes e depois e o que falta.
```

Tem mais cinco prompts prontos (rotina mensal, kit de perfis, artigo, sistema com login, portfólio pessoal) em [`templates/PROMPT-SESSAO.md`](templates/PROMPT-SESSAO.md).

Para a rotina mensal, preencha antes o [`inventario.md`](inventario.md) e o [`urls.txt`](urls.txt) com os seus endereços e perfis (ou peça ao agente para preencher com você).

**Só quer a nota do seu site, sem instalar nada?** Com Node.js instalado, baixe a pasta e rode:

```bash
node scripts/verificar-geo.mjs https://seusite.com.br
```

O verificador só lê páginas públicas: não envia dado, não precisa de chave e não custa nada.

## Travas de segurança

Sem uma ordem sua naquela conversa, a skill **nunca**: publica o site, faz push, mexe em DNS, envia formulário, publica ou edita perfil, entra em conta (Search Console, Bing, Google, redes sociais), cria conta, usa senha ou lê arquivo de credenciais, ou mexe em pixel e analytics que já existem.

Ela também nunca inventa preço, prazo, avaliação, cliente ou número. O que faltar vira uma pendência marcada como `TODO` para você responder. Nome de cliente só entra com autorização (LGPD).

## O que ela não promete

- **Não garante citação.** Quem escolhe as fontes é a IA. A skill deixa você pronto para ser escolhido e mede se está funcionando.
- **Não é instantâneo.** O efeito aparece de 2 a 4 semanas depois de publicar, quando os buscadores releem o site.
- **Não troca presença real.** Perfil no Google, LinkedIn, YouTube, avaliações de clientes reais e menções em sites do seu setor pesam muito. A skill monta o plano e os textos; a reputação é sua.
- **Não é para anúncio pago.**

## Arquivos

```
SKILL.md                         instruções que o agente segue (três modos e regras)
references/
  regua.md                       régua de 0 a 10 em seis dimensões
  checklist-tecnico.md           robots.txt, sitemap, metadados, JSON-LD, pré-renderização, publicação, SaaS com login
  conteudo-citavel.md            como escrever o trecho que a IA cita
  perfis-e-fora-do-site.md       checklist por rede social e plano de 90 dias fora do site
templates/
  PROMPT-SESSAO.md               6 prompts prontos para colar
  PROMPT-BASE.md                 prompt do site, preenchido na primeira etapa
  PERGUNTAS-TESTE.md             as 20 perguntas e a tabela de medição
  robots-ia.txt, llms.txt        modelos prontos
  jsonld.md                      modelo de dados estruturados
  KIT-PERFIS.md                  kit de textos para Google, LinkedIn, Instagram e YouTube
  BRIEF-ARTIGO.md                pedido de artigo para um subagente, sem inventar dado
scripts/
  verificar-geo.mjs              nota técnica automática (testes: node --test scripts/verificar-geo.test.mjs)
inventario.md, urls.txt          seus sites e perfis (você preenche)
rotina.md, historico/            rotina mensal e relatórios guardados
```

## Créditos

Construída a partir do estudo de dois projetos abertos: [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) e [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude), e da aplicação em sites reais da Visão Projetos BIM e do medIAobra.

## Autor

**Igor Rocha**, da [Visão Projetos BIM](https://visaoprojetosbim.com) e do [IA na prática com Igor](https://ianapraticacomigor.com). GitHub: [@AIgorrocha](https://github.com/AIgorrocha).

## Licença

[MIT](LICENSE): use, adapte e compartilhe à vontade, mantendo o aviso de autoria.
