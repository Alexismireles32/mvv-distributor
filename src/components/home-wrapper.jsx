"use client";

import React, { useRef, createContext, useContext } from "react";
import { Header76 } from "./header-76";
import { WhatsAppFloat } from "./whatsapp-float";

// Create context for WhatsApp handler
export const WhatsAppContext = createContext(null);

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  return context;
};

export function WhatsAppProvider({ children }) {
  const whatsappRef = useRef(null);

  const handleOpenWhatsApp = () => {
    if (whatsappRef.current) {
      whatsappRef.current.open();
    }
  };

  return (
    <WhatsAppContext.Provider value={handleOpenWhatsApp}>
      {children}
      <WhatsAppFloat ref={whatsappRef} />
    </WhatsAppContext.Provider>
  );
}

export function HomeWrapper() {
  const whatsappRef = useRef(null);

  const handleOpenWhatsApp = () => {
    if (whatsappRef.current) {
      whatsappRef.current.open();
    }
  };

  return (
    <>
      <Header76 onOpenWhatsApp={handleOpenWhatsApp} />
      <WhatsAppFloat ref={whatsappRef} />
    </>
  );
}

