"use client";

import React from 'react';
import { CartProvider } from './customer-cart';
import { WhatsAppProvider } from './home-wrapper';
import { Navbar6 } from './navbar-06';
import { HomeWrapper } from './home-wrapper';
import { HomeDistributorBanner } from './home-distributor-banner';

export function HomeOrderWrapper() {
  return (
    <CartProvider>
      <WhatsAppProvider>
        <Navbar6 />
        <HomeWrapper />
        <HomeDistributorBanner />
      </WhatsAppProvider>
    </CartProvider>
  );
}


