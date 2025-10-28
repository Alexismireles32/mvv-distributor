"use client";

import React from "react";

export function Layout401() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center" />
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="flex flex-col justify-center border border-border-primary bg-white p-6 transition-all hover:shadow-lg hover:border-como">
            <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
              ✓ 15 años de experiencia
            </h3>
            <p>
              Desde 2010 brindando soluciones naturales efectivas para el
              control de peso y bienestar integral.
            </p>
          </div>
          <div className="flex flex-col justify-center border border-border-primary bg-white p-6 transition-all hover:shadow-lg hover:border-como">
            <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
              ✓ Envíos a todo México y USA
            </h3>
            <p>
              Cobertura nacional completa y envíos internacionales a Estados
              Unidos con paquetería especializada y rastreo en tiempo real.
            </p>
          </div>
          <div className="flex flex-col justify-center border border-border-primary bg-white p-6 transition-all hover:shadow-lg hover:border-como">
            <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
              ✓ Laboratorios Mexicanos Certificados
            </h3>
            <p>
              Productos formulados en instalaciones con certificación Cofepris
              que garantizan calidad, pureza y seguridad en cada lote.
            </p>
          </div>
          <div className="flex flex-col justify-center border border-border-primary bg-white p-6 transition-all hover:shadow-lg hover:border-como">
            <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
              ✓ Miles de clientes satisfechos
            </h3>
            <p>
              Miles de personas han alcanzado sus objetivos de salud y
              transformación con nuestros tratamientos naturales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
