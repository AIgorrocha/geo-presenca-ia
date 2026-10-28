# Modelo de JSON-LD (uma entidade só, ligada por `@id`)

Regra de ouro: a marca é declarada UMA vez, na home, com `@id` fixo. Todo o resto (artigos, blog, serviços) aponta para esse `@id`. Nome, CNPJ e perfis iguais aos que aparecem na tela e no rodapé. Exemplo no ar: abra `https://visaoprojetosbim.com`, veja o código-fonte (Ctrl+U) e procure `application/ld+json`.

## Home: `@graph` com a organização, o site e o FAQ

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://{SITE}/#organizacao",
      "name": "{NOME DA MARCA}",
      "description": "{a mesma frase de 'quem é' do topo do site}",
      "url": "https://{SITE}/",
      "logo": "https://{SITE}/{logo}",
      "telephone": "{+55...}",
      "email": "{e-mail}",
      "taxID": "{CNPJ, se empresa}",
      "address": { "@type": "PostalAddress", "addressLocality": "{cidade}", "addressRegion": "{UF}", "addressCountry": "BR" },
      "areaServed": "{BR ou região}",
      "founder": { "@type": "Person", "name": "{nome}" },
      "knowsAbout": ["{tema}", "{tema}"],
      "sameAs": ["{perfil 1}", "{perfil 2}"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "{serviço}", "description": "{uma frase}", "provider": { "@id": "https://{SITE}/#organizacao" } } }
        ]
      }
    },
    { "@type": "WebSite", "@id": "https://{SITE}/#site", "url": "https://{SITE}/", "name": "{NOME DA MARCA}", "publisher": { "@id": "https://{SITE}/#organizacao" }, "inLanguage": "pt-BR" },
    { "@type": "FAQPage", "@id": "https://{SITE}/#faq", "mainEntity": [ { "@type": "Question", "name": "{pergunta igual à da tela}", "acceptedAnswer": { "@type": "Answer", "text": "{resposta igual à da tela}" } } ] }
  ]
}
```

- Pessoa (portfólio, perfil pessoal): troque `ProfessionalService` por `Person` com `jobTitle`, `worksFor` (`@id` da empresa) e `sameAs`.
- Produto ou app: `SoftwareApplication` (ou `Product`) com `publisher` no `@id` da organização. Só ponha `offers` com preço se o preço está na tela.
- Negócio com endereço de atendimento: `LocalBusiness` (ou subtipo) com endereço completo e `openingHours`.

## Artigo
`BlogPosting` com `headline`, `datePublished`, `dateModified` (= revisão ou publicação), `author` (`Person` com `url` ou `sameAs` do LinkedIn quando houver), `publisher: { "@id": "https://{SITE}/#organizacao" }`, `mainEntityOfPage`. Mais um `BreadcrumbList` (Início, Blog, artigo).

## Página do blog
`Blog` com `publisher` no `@id` e a lista `blogPost` (título, URL, datas).

## Proibido
- FAQ no JSON-LD diferente do FAQ visível (é o erro mais comum, e o Google trata como spam).
- `aggregateRating` ou `review` sem avaliação real publicada na página.
- `priceRange`, prazo ou número que não está na tela.
- Duas organizações com nomes diferentes para a mesma marca.

## Como testar
Teste no build: um só `@id` de organização, `sameAs` igual aos links do rodapé, perguntas do FAQPage iguais às da tela. Depois de publicar: validador de dados estruturados do Google (Rich Results Test) e o do schema.org.
