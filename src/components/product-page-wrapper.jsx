"use client";

import React, { useRef } from "react";
import { ProductSimple } from "./product-simple";
import { ProductCarousel } from "./product-carousel";
import { WhatsAppFloat } from "./whatsapp-float";
import { WhatsAppContext } from "./home-wrapper";

export function ProductPageWrapper({ productData }) {
  const whatsappRef = useRef(null);

  const handleOpenWhatsApp = () => {
    if (whatsappRef.current) {
      whatsappRef.current.open();
    }
  };

  return (
    <WhatsAppContext.Provider value={handleOpenWhatsApp}>
      <ProductSimple {...productData} />
      <ProductCarousel currentProductUrl={productData.productUrl} />
      <WhatsAppFloat ref={whatsappRef} />
    </WhatsAppContext.Provider>
  );
}

