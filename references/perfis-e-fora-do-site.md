# Perfis e presença fora do site

As IAs confirmam quem é a marca cruzando fontes. O que pesa (segundo os dois repositórios estudados): vídeo no YouTube, LinkedIn, Perfil de Empresa no Google, menções em sites do setor e imprensa, avaliações reais, participação real no Reddit. Backlink pesa pouco. Menção inventada é tratada como spam.

## Regra de ouro: a mesma entidade em todo lugar
Mesmo nome, mesma descrição de uma frase, mesmo site, mesmo telefone e cidade (quando houver). Escreva uma vez no `inventario.md` (seção Entidades) e copie igual.

Descrição base de uma frase (modelo): "<Marca> faz <o quê> para <quem>, <onde/como>. <Fato verificável>."

## Checklist por perfil
| Plataforma | O que preencher | Ligação com o site |
|---|---|---|
| Perfil de Empresa no Google | nome exato, categoria principal certa, descrição base, site, telefone, área de atendimento, fotos de projetos, posts mensais, pedir avaliação a cliente real | link do perfil no `sameAs` |
| Bing Places | importar do Google | idem |
| LinkedIn (empresa) | descrição base no primeiro parágrafo, especialidades (disciplinas), site, posts técnicos | `sameAs` |
| LinkedIn (pessoa) | título com cargo e empresa, "Sobre" answer-first, experiência ligada à página da empresa | `sameAs` do `Person` autor dos artigos |
| Instagram | bio com a descrição base curta, link para o site (não só para link-na-bio), destaques por serviço | `sameAs` |
| YouTube | descrição do canal answer-first, vídeos com título em pergunta, descrição com 2 parágrafos e link para a página certa, legenda revisada | `sameAs`; vídeo embutido na página que ele explica |
| TikTok, X, Threads | bio igual à base, link para o site | `sameAs` |
| GitHub (projetos abertos) | README com o que é, para quem, como usar, link do site | `sameAs` |
| Wikidata | só com notoriedade (imprensa independente); nunca criar verbete promocional | `sameAs` quando existir |

Para cada perfil, o agente entrega: texto pronto para colar, campos a mudar, e a linha atualizada no `inventario.md`. Quem publica é o usuário, ou o agente com autorização daquela vez.

## Fora do site (plano de 90 dias, adaptar por marca)
- **Diretórios do setor:** associações, plataformas de profissionais e catálogos do nicho (pesquisar os 5 principais por marca; anotar URL e status).
- **Imprensa e parceiros:** artigo técnico ou entrevista em portal do setor; estudo de caso publicado com parceiro (sem nome de cliente sem autorização).
- **Reddit e fóruns:** responder perguntas reais da área com conteúdo útil, sem propaganda; link só quando for a melhor resposta.
- **YouTube:** 1 vídeo por pergunta de teste que ainda não cita a marca.
- **Avaliações:** pedir a clientes reais no Google; nunca comprar ou escrever.
- **Bing Webmaster e Search Console:** sitemap enviado, relatório de IA generativa acompanhado.

## Medição
As 20 perguntas de cada marca, todo mês, no ChatGPT, Claude, Perplexity e Gemini (janela anônima quando der): cita com link (C), menciona sem link (M) ou não aparece (-), mais erros de fato. Complementos: logs do servidor por user-agent de IA, GA4 por origem (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com).
