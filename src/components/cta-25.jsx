"use client";

import React from "react";
import { useWhatsApp } from "./home-wrapper";

export function Cta25() {
  const onOpenWhatsApp = useWhatsApp();
  
  // Fallback function if context is not available
  const handleClick = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      // Fallback: direct approach to open WhatsApp popup
      const floatButton = document.querySelector('[aria-label="Contactar por WhatsApp"]');
      if (floatButton) {
        floatButton.click();
      }
    }
  };

  return (
    <section id="relume" className="px-[5%] py-4 md:py-6 lg:py-8 pb-16 md:pb-24 lg:pb-28">
      <div className="container max-w-lg text-center">
        <h2 className="rb-5 mb-5 text-3xl font-bold leading-tight md:mb-6 md:text-5xl md:leading-tight lg:text-8xl lg:leading-none">
          Haz tu pedido
        </h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 items-center justify-center md:mt-8">
          <button 
            onClick={handleClick}
            className="w-full sm:w-auto bg-como hover:bg-[#3d6849] text-white font-bold text-base px-8 py-4 min-h-[44px] md:text-lg md:px-10 md:py-6 shadow-xl hover:shadow-2xl active:scale-95 md:hover:scale-105 transition-all duration-300 rounded-full"
          >
            <span className="flex items-center justify-center gap-2 md:gap-3">
              <span>Comprar por WhatsApp</span>
              <span className="text-xl md:text-2xl">🇲🇽🇺🇸</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
