# Régua de 0 a 10 (nota de preparação)

Junta o melhor da `seo-geo` do claude-seo e do geo-seo-claude (estudo de 27/10/2026). A nota mede se a página está **pronta** para ser citada. O **resultado** é a taxa de citação medida com as 20 perguntas, sempre reportada ao lado.

| Dimensão | Peso | O que conta | Como medir |
|---|---|---|---|
| Acesso e técnica | 20% | robots por finalidade, HTML sem depender de JS, sitemap, servidor/Cloudflare sem bloquear robô de IA | `scripts/verificar-geo.mjs` |
| Conteúdo citável e estrutura | 25% | resposta direta nas 2 primeiras frases, trechos autossuficientes de 40 a 80 palavras com o nome da marca, títulos em pergunta, tabelas, números com fonte e ano | leitura (subagente de conteúdo), `references/conteudo-citavel.md` |
| Entidade e JSON-LD | 15% | Organization/Person com `@id`, logo, `sameAs` (5 ou mais perfis), mesmo nome e descrição em todo lugar, JSON-LD igual ao que está na tela | verificador + leitura do JSON-LD |
| Autoridade fora do site | 20% | YouTube, LinkedIn, Perfil de Empresa no Google, avaliações reais, menções em imprensa e diretórios do setor, Reddit com participação real | `references/perfis-e-fora-do-site.md` |
| Autor e frescor | 15% | autor real com credencial e página, data de publicação e de revisão visíveis, revisão a cada 3 meses | leitura |
| Multimídia e plataformas | 5% | vídeo e imagem com texto alternativo, Bing Webmaster/IndexNow | leitura |

Faixas: 9 a 10 excelente; 7,5 a 8,9 bom; 6 a 7,4 regular; 4 a 5,9 fraco; abaixo de 4 invisível.

Como somar: dê 0 a 10 em cada dimensão, multiplique pelo peso, some. Escreva a evidência de cada nota (arquivo, URL ou trecho). O verificador automático cobre só a primeira dimensão e parte da terceira; a nota dele aparece separada como "nota técnica".

O que **não** conta ponto: llms.txt (nenhum provedor confirmou uso; o Google diz que ignora), número de backlinks (pesa pouco), "caça a menções" inventadas (o Google trata como spam).
