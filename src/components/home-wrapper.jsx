"use client";

import React, { createContext, useContext } from "react";
import { Header76 } from "./header-76";
// WhatsAppFloat removed - not needed for distributor site
// import { WhatsAppFloat } from "./whatsapp-float";

// Create context for WhatsApp handler (kept for compatibility but disabled)
export const WhatsAppContext = createContext(null);

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  return context;
};

export function WhatsAppProvider({ children }) {
  // WhatsApp disabled for distributor site
  return (
    <WhatsAppContext.Provider value={null}>
      {children}
      {/* WhatsAppFloat removed */}
    </WhatsAppContext.Provider>
  );
}

export function HomeWrapper() {
  // WhatsApp disabled for distributor site
  return (
    <>
      <Header76 onOpenWhatsApp={() => {}} />
      {/* WhatsAppFloat removed */}
    </>
  );
}

