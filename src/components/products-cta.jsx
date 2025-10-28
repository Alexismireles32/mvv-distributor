"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

export function ProductsCta() {
  return (
    <section className="px-[5%] pt-0 pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-20">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <Button
            title="Ver Todos los Productos"
            size="lg"
            asChild
            className="group relative overflow-hidden bg-gradient-to-r from-como to-[#3d6849] hover:from-[#3d6849] hover:to-como text-white font-bold text-base px-12 py-5 md:text-lg md:px-16 md:py-6 shadow-2xl hover:shadow-como/50 active:scale-95 md:hover:scale-105 transition-all duration-500 rounded-full min-h-[56px]"
          >
            <a href="/productos" className="flex items-center justify-center gap-3">
              <span className="relative z-10">Ver Catálogo Completo</span>
              <BiRightArrowAlt className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-text-secondary md:text-base">
            🚚 Envío rápido México y USA • 📦 +20 productos disponibles
          </p>
        </div>
      </div>
    </section>
  );
}
