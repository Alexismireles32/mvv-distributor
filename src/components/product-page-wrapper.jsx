"use client";

import React from "react";
import { ProductSimple } from "./product-simple";
import { ProductCarousel } from "./product-carousel";
// import { WhatsAppFloat } from "./whatsapp-float"; // Disabled for distributor site
import { WhatsAppContext } from "./home-wrapper";

export function ProductPageWrapper({ productData }) {
  // WhatsApp disabled for distributor site
  const handleOpenWhatsApp = () => {
    // No-op for distributor site
  };

  return (
    <WhatsAppContext.Provider value={handleOpenWhatsApp}>
      <ProductSimple {...productData} />
      <ProductCarousel currentProductUrl={productData.productUrl} />
      {/* WhatsAppFloat removed for distributor site */}
    </WhatsAppContext.Provider>
  );
}

