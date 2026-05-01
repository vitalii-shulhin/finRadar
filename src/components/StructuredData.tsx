export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "FinRadar",
    "description": "Фінансовий портал України - новини, курси валют, кредити, депозити та страхування",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://finradar.ua",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://finradar.ua"}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UA",
      "addressLocality": "Україна"
    },
    "areaServed": "UA",
    "availableLanguage": ["uk", "ru", "en"],
    "sameAs": [
      // Add your social media links here when available
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinRadar",
    "description": "Фінансовий портал України",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://finradar.ua",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://finradar.ua"}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
