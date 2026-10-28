# Prompts para colar numa sessão nova

Abrir o Claude Code (ou o Codex) na pasta do projeto e colar um destes. A skill `geo-presenca-ia` faz o resto. Trocar o que está entre chaves; o que não souber, apague a linha (o agente pergunta uma vez e, sem resposta, deixa `TODO`).

Todos valem com esta trava, que já está na skill e pode ser colada junto para reforçar:
```
Sem pedido meu nesta conversa: não publique, não faça push, não mexa em DNS, não envie formulário,
não publique nem edite perfil, não mexa em conta (Search Console, Bing, Google, redes), não crie conta,
não entre com senha, não leia arquivos de senha ou credenciais, não mexa em pixel ou analytics.
```

## 1. Aplicar num site, app ou sistema
```
Use a skill geo-presenca-ia no Modo 1 neste projeto ({nome}, endereço {url}).
Objetivo: ser lido e citado por ChatGPT, Claude, Perplexity e Gemini quando perguntarem sobre {tema} {onde}.
Público: {quem compra}. Fatos que eu confirmo: {preço ou forma de cobrar, prazo típico, CNPJ, cidade, anos de experiência}.
Pode seguir sem me perguntar a cada passo; pergunte de uma vez só o que só eu sei.
Trabalhe na branch llm-seo, com teste, build e relatório em llm-seo/RELATORIO.md.
{Publicação: "pode publicar quando estiver verde" OU "não publique, só prepare"}.
DNS fica comigo: me passe o passo a passo quando chegar a hora.
No fim, me diga em linguagem simples o que mudou, a nota antes e depois, e o que falta.
```

## 2. Rotina mensal de todas as marcas
```
Rode a rotina de GEO da skill geo-presenca-ia (rotina.md): verificador em todas as URLs do inventário,
comparação com o mês anterior, perguntas de teste por busca na web, e me traga o que caiu e o que fazer.
Não publique nada sem me perguntar.
```

## 3. Kit de perfis de uma marca
```
Use a skill geo-presenca-ia no Modo 2 para {marca}: monte o KIT-PERFIS (Google, LinkedIn, Instagram, YouTube)
a partir do site {url} e dos posts em {pasta}. Textos prontos para colar, com limite de caracteres.
Eu publico.
```

## 4. Artigo a partir de material próprio
```
Use a skill geo-presenca-ia para escrever um artigo no blog de {marca} sobre {tema}, respondendo a pergunta
"{pergunta que o cliente faria à IA}". Material: {caminhos de posts, palestra, vídeo, fotos}.
Sem nome de cliente. {Pode publicar e pedir indexação | Só prepare o rascunho}.
```

## 5. Sistema com login (SaaS)
```
Use a skill geo-presenca-ia no Modo 1 neste sistema ({nome}, {url}), seguindo a seção 10 do checklist técnico
(SaaS com login). Só a parte pública deve ser achada pelas IAs: {rotas públicas, se souber}.
Para quem é: {público}. Preço: {real ou "sob consulta"}. Nada de entrar na área logada em produção.
Branch llm-seo, teste, build e relatório. {Pode publicar | Não publique}.
```

## 6. Portfólio ou site pessoal
```
Use a skill geo-presenca-ia no Modo 1 no meu site pessoal ({url}). Ele precisa dizer às IAs quem eu sou:
{cargo e frase de "quem é"}. Perfis para o sameAs: {LinkedIn, GitHub, YouTube, Instagram}.
JSON-LD Person + ProfilePage, texto legível sem JavaScript (pré-renderizar se for SPA), sem mexer no pixel.
Branch llm-seo, teste, build e relatório. {Pode publicar | Não publique}.
```
