"use client";

import React from "react";
import { BiPackage, BiCreditCard } from "react-icons/bi";

export function Layout128() {
  return (
    <section id="relume" className="px-[5%] py-8 md:py-12 bg-gradient-to-br from-como via-[#3d6849] to-como">
      <div className="container max-w-5xl">
        {/* Header - Ultra compacto */}
        <div className="text-center mb-5 md:mb-6">
          <h2 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
            Envíos Rápidos • Pagos Flexibles
          </h2>
        </div>

        {/* Grid Simétrico 50/50 */}
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          
          {/* Envíos - Left Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <BiPackage className="h-5 w-5 text-white flex-shrink-0" />
              <h3 className="text-base font-bold text-white md:text-lg">
                Tiempos de Entrega
              </h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm md:text-base">
                <span className="text-white/90 font-medium">🇲🇽 México</span>
                <span className="text-white font-semibold">1-3 días</span>
              </div>
              <div className="flex items-center justify-between text-sm md:text-base">
                <span className="text-white/90 font-medium">🇺🇸 USA</span>
                <span className="text-white font-semibold">3-5 días</span>
              </div>
              <div className="pt-2 border-t border-white/20 text-xs text-white/70 text-center">
                📦 Rastreo incluido • Envío mismo día
              </div>
            </div>
          </div>

          {/* Pagos - Right Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <BiCreditCard className="h-5 w-5 text-white flex-shrink-0" />
              <h3 className="text-base font-bold text-white md:text-lg">
                Métodos de Pago
              </h3>
            </div>

            <div className="space-y-2">
              {/* México */}
              <div>
                <div className="text-sm text-white/90 font-medium mb-1.5">🇲🇽 México</div>
                <div className="flex flex-wrap gap-1.5">
                  {["OXXO", "Transfer", "Mercado Pago", "Kueski"].map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-white/20 rounded text-white text-xs font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* USA */}
              <div>
                <div className="text-sm text-white/90 font-medium mb-1.5">🇺🇸 USA</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Zelle", "PayPal", "CashApp", "Tarjetas"].map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-white/20 rounded text-white text-xs font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Ultra compacto */}
        <div className="mt-4 pt-3 border-t border-white/20 text-center">
          <p className="text-xs text-white/70 md:text-sm">
            🛡️ Pagos 100% seguros • 📦 Empaque discreto • ⏱️ Procesamiento inmediato
          </p>
        </div>
      </div>
    </section>
  );
}
