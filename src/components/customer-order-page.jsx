"use client";

import React from "react";
import { CartProvider } from "./customer-cart";
import { WhatsAppProvider } from "./home-wrapper";
import { Navbar6 } from "./navbar-06";
import { CustomerOrderActivator } from "./customer-order-activator";
import { HomeDistributorBanner } from "./home-distributor-banner";
import { Product4Enhanced } from "./product-04-enhanced";
import { Product4_1Enhanced } from "./product-04_1-enhanced";
import { Product4_2Enhanced } from "./product-04_2-enhanced";
import { Cta25 } from "./cta-25";
import { Footer2 } from "./footer-02";

export function CustomerOrderPage({ initialCode }) {
  return (
    <CartProvider initialCode={initialCode}>
      <WhatsAppProvider>
        <Navbar6 />

        {/* Compact distributor banner on products page when active */}
        <HomeDistributorBanner variant="compact" />

        <CustomerOrderActivator />

        <Product4Enhanced />
        <Product4_1Enhanced />
        <Product4_2Enhanced />

        <Cta25 />
        <Footer2 />
      </WhatsAppProvider>
    </CartProvider>
  );
}


