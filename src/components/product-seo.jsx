"use client";

import React from "react";

export function ProductSEO({ productName, productImage, productUrl, description }) {
  // Product Schema
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "image": [productImage, "https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"],
    "description": description || `${productName} - Suplemento natural de MVV Natural. 100% natural, alta calidad.`,
    "brand": {
      "@type": "Brand",
      "name": "MVV Natural",
      "logo": "https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "MVV Natural",
      "url": "https://www.mvvnatural.com"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.mvvnatural.com${productUrl}`,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "price": "0",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "USD",
        "price": "0",
        "valueAddedTaxIncluded": false
      },
      "seller": {
        "@type": "Organization",
        "name": "MVV Natural USA"
      },
      "eligibleRegion": ["US", "MX"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.mvvnatural.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Productos",
        "item": "https://www.mvvnatural.com/productos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": productName,
        "item": `https://www.mvvnatural.com${productUrl}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

