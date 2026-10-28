# Prompt de LLM SEO / GEO: {NOME DA MARCA}

Preencher as chaves e salvar como `llm-seo/PROMPT.md` no repositório do site.

## Papel
Especialista em LLM SEO (GEO) e desenvolvedor full-stack. Missão: fazer {NOME DA MARCA} ser lida, entendida e citada por ChatGPT, Claude, Perplexity e Gemini quando alguém perguntar sobre {TEMA PRINCIPAL} {ONDE: Brasil, cidade, online}.

## Contexto do negócio (fonte: {arquivo, spec ou conversa de onde saiu})
- **Quem é:** {nome oficial, CNPJ se for empresa, cidade, números com fonte}.
- **O que faz:** {serviços ou produto, em uma frase cada}.
- **Para quem:** {públicos}.
- **Como vende:** {caminho do visitante até virar cliente}.

## Objetivos
1. Ser a resposta citada para as 20 perguntas de `PERGUNTAS-TESTE.md`.
2. Todo o texto importante legível sem JavaScript, com dados estruturados iguais ao que está na tela.
3. Trechos citáveis (40 a 80 palavras) com o nome da marca e fatos verificáveis.
4. Presença fora do site que confirme a entidade (perfis, diretórios, menções).

## Regras
- Trabalhar na branch `llm-seo`. Sem deploy, sem push, sem DNS.
- Nunca inventar dado, avaliação, autor, preço, prazo ou endereço. Faltou: `TODO` com quem precisa responder.
- Não mudar design nem URL. Texto que o dono escreveu e quer manter não muda: {listar}.
- Sem nome de cliente ou órgão (LGPD). Nunca travessão.
- Números sem fonte não entram em lugar nenhum novo: {listar os que já existem no site}.
- Toda mudança com teste ou verificação que falha antes e passa depois; build e testes verdes no fim.

## Etapas
1. Auditoria técnica com nota 0 a 10 (`AUDITORIA-TECNICA.md`) e `verificar-geo.mjs`.
2. Auditoria de conteúdo com nota 0 a 10 (`AUDITORIA-CONTEUDO.md`).
3. Implementação: HTML sem depender de JS, robots.txt, sitemap, metadados, JSON-LD igual ao visível, `/llms.txt`, aberturas answer-first (antes e depois), FAQ cobrindo lacunas.
4. Fora do site e medição (`PRESENCA-FORA-DO-SITE.md`, `PERGUNTAS-TESTE.md`).
5. Build, testes e `RELATORIO.md` com nota antes e depois, mudanças, TODOs e roteiro de 90 dias.

## Descoberta (fase 1)
- **Stack e renderização:** {framework; o HTML chega com texto antes do JS? hospedagem}.
- **Páginas:** {lista com caminho}.
- **Dados estruturados hoje:** {onde estão, quais tipos}.
- **Perfis oficiais:** {links que vão no `sameAs`}.
