# Rotina de presença nas IAs

Quando: todo mês (primeira segunda-feira) e sempre que publicar site ou página nova. O agente faz a parte de máquina; o usuário aprova o que for publicar ou mexer em perfil. Tempo do usuário: uns 20 minutos por mês.

## Todo mês
1. **Nota técnica de tudo.** Na pasta da skill:
   `node scripts/verificar-geo.mjs --lista urls.txt --md historico/AAAA-MM.md`
   Comparar com o arquivo do mês anterior em `historico/`. Caiu nota, robô bloqueado, página sem texto sem JavaScript ou sitemap sumido = consertar ou abrir TODO no repositório do site.
2. **As 20 perguntas** de cada marca já aplicada (arquivo `llm-seo/PERGUNTAS-TESTE.md` de cada site) nas quatro IAs, em janela anônima. Anotar C, M ou - e qualquer erro de fato. O agente pode rodar as que têm busca na web disponível; as outras o usuário roda e cola o resultado.
3. **Conteúdo.** Pergunta que não cita a marca há dois meses vira tarefa: pergunta nova no FAQ, artigo ou vídeo curto que responda direto. Página revisada de verdade ganha data nova (`updatedAt`); data nova sem revisão é proibido.
4. **Registro.** Linha nova na tabela de rodadas das perguntas, nota do mês no `inventario.md` e no `historico/` do mês.

## Depois de cada publicação (site ou artigo novo)
- `verificar-geo.mjs` no endereço oficial da página nova.
- IndexNow com a lista do sitemap e pedido de indexação no Search Console (passo a passo em `references/checklist-tecnico.md`, seção 8).
- URL nova em `urls.txt` e no `inventario.md`.

## A cada três meses
- Perfis do `inventario.md`: nome, frase de "quem é", link do site e categoria iguais à entidade; `sameAs` do site igual aos perfis que existem.
- Repositórios de referência: conferir se o plugin `claude-seo` tem versão nova (`/plugin` no Claude Code) e se a lista de robôs de IA mudou (`references/checklist-tecnico.md`).
- Rever o roteiro de 90 dias de cada marca (`llm-seo/RELATORIO.md` do site).

## Página ou site novo
Antes de publicar: Modo 1 da skill (`SKILL.md`). No mínimo: HTML com texto sem JavaScript, robots.txt de `templates/robots-ia.txt`, sitemap, título e descrição próprios, JSON-LD de `templates/jsonld.md`, e a URL entra em `urls.txt` e no `inventario.md`.

## Agendar (só com autorização do usuário)
A rotina pode virar tarefa agendada do seu agente ou cron no seu servidor. Sem pedido explícito, nada é agendado: o usuário chama "rodar a rotina de GEO" quando quiser. Se agendar: só o passo 1 roda sozinho (leitura de páginas públicas, sem custo de API); o resultado vai para `historico/` e o resto espera o usuário.
