"use client";

import React from "react";

// DISABLED: This component generates structured data that tells Google to index content
// For distributor site, we want ZERO structured data to prevent indexing
export function ProductSEO({ productName, productImage, productUrl, description }) {
  // NO STRUCTURED DATA - This prevents Google from indexing this internal tool
  return null;
}

