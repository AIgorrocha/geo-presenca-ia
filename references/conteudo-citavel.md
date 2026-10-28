# Conteúdo que a IA cita

A IA monta a resposta com trechos curtos que fazem sentido sozinhos. O trabalho é deixar esses trechos prontos, com o nome da marca e fato verificável.

## Regras
1. **Resposta primeiro.** As 2 primeiras frases de cada página e de cada seção dizem o quê, para quem e como. Sem introdução de aquecimento.
2. **Trecho citável:** 40 a 80 palavras, autossuficiente (entende-se sem o resto da página), com o nome da marca escrito por extenso ("A {Marca}...", nunca só "a empresa"), um fato verificável (número, lugar, prazo, método) e sem pronome solto no começo ("Ela", "Isso").
3. **Quem, o quê, para quem, onde, como contratar** em algum lugar visível de toda página principal.
4. **Títulos em forma de pergunta** quando a seção responde uma pergunta real ("Quanto custa um projeto BIM?").
5. **Números com fonte e ano.** Número sem fonte não entra; número interno da empresa entra com o nome da marca e o ano ("+326 projetos entregues até 2026").
6. **Autor e data.** Artigo com autor real (nome, cargo, link do perfil) e datas de publicação e revisão visíveis. Revisar os artigos principais a cada 3 meses e atualizar `dateModified` só quando o conteúdo mudou de verdade.
7. **Tabelas e listas** para comparação, etapas, disciplinas e preços (se houver preço real).
8. **FAQ cobrindo as lacunas** das 20 perguntas de teste; a resposta começa com a resposta ("Sim.", "Em média...", "De 30 a 60 dias...") e o JSON-LD `FAQPage` sai da mesma fonte do FAQ visível.
9. **Dado próprio vence texto genérico:** estudo de caso com número real, foto do projeto, print do sistema.
10. **O que não fazer:** encher de palavra-chave, criar página só para robô, texto escondido, avaliação ou cliente inventado, número "de mercado" sem fonte.

## Formato antes e depois (para mostrar ao usuário)
```
ARQUIVO:linha
ANTES: texto atual
DEPOIS: texto novo (answer-first, 40 a 80 palavras, fato do repositório)
POR QUÊ: uma linha
```

## Como achar as lacunas
Para cada uma das 20 perguntas de teste, procurar a resposta no site. Sem resposta: virar pergunta do FAQ (com fato) ou `TODO` para o dono (preço, prazo, cidade, CNPJ, autor).
