"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { BiLogoWhatsapp } from "react-icons/bi";

export const WhatsAppFloat = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: togglePopup
  }));

  return (
    <>
      {/* Floating WhatsApp Button - Mobile Optimized */}
      <div className="fixed bottom-20 right-3 z-[9999] flex flex-col items-end gap-3 xxs:right-4 md:bottom-6 md:right-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)', paddingRight: 'env(safe-area-inset-right)' }}>
        {/* Popup with options - Mobile optimized */}
        {isOpen && (
          <div className="animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2 flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-2xl border-2 border-como max-w-[260px] xxs:max-w-[280px] sm:max-w-none sm:p-4">
            <div className="mb-1 flex items-center justify-between sm:mb-2">
              <h3 className="text-base font-bold text-como sm:text-lg">¿Dónde te encuentras?</h3>
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-como transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                aria-label="Cerrar"
              >
                <RxCross2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Mexico Option - Touch friendly */}
            <a
              href="https://wa.me/526312982043?text=Hola,%20me%20gustaría%20información%20sobre%20los%20productos%20naturales%20MVV%20Natural%20🇲🇽"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-como active:bg-[#3d6849] p-3 transition-all duration-300 active:scale-95 min-h-[56px] sm:gap-3 sm:p-4 sm:hover:bg-[#3d6849] sm:hover:shadow-lg sm:hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl sm:text-3xl">🇲🇽</span>
              <div className="flex flex-col text-white flex-1">
                <span className="font-bold text-sm sm:text-base">México</span>
                <span className="text-xs opacity-90">+52 631 298 2043</span>
              </div>
              <BiLogoWhatsapp className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </a>

            {/* USA Option - Touch friendly */}
            <a
              href="https://wa.me/15202161443?text=Hola,%20me%20gustaría%20información%20sobre%20los%20productos%20naturales%20MVV%20Natural%20🇺🇸"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-white active:bg-ecru-white border-2 border-como p-3 transition-all duration-300 active:scale-95 min-h-[56px] sm:gap-3 sm:p-4 sm:hover:bg-ecru-white sm:hover:shadow-lg sm:hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl sm:text-3xl">🇺🇸</span>
              <div className="flex flex-col text-como flex-1">
                <span className="font-bold text-sm sm:text-base">USA</span>
                <span className="text-xs opacity-90">+1 520 216 1443</span>
              </div>
              <BiLogoWhatsapp className="h-7 w-7 text-como sm:h-8 sm:w-8" />
            </a>
          </div>
        )}

        {/* Main Floating Button - Touch optimized */}
        <button
          onClick={togglePopup}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition-all duration-300 active:scale-95 sm:h-16 sm:w-16 sm:hover:scale-110 sm:hover:shadow-3xl motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          aria-label="Contactar por WhatsApp"
        >
          {/* Pulse animation - reduced on mobile, respects prefers-reduced-motion */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-50 motion-reduce:animate-none sm:opacity-75"></span>
          
          {/* Icon */}
          <BiLogoWhatsapp className="relative h-8 w-8 text-white sm:h-9 sm:w-9" />
          
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-lg sm:h-6 sm:w-6">
            2
          </span>
        </button>

        {/* Tooltip - Hidden on mobile, shown on desktop */}
        {!isOpen && (
          <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="whitespace-nowrap rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-xl">
              ¿Necesitas ayuda? ¡Contáctanos!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
                <div className="h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

