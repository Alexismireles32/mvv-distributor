"use client";

import React, { useState, useEffect } from 'react';

export function PDFCatalogViewer() {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    // Timeout para ocultar el loader después de 2 segundos
    // El PDF se está cargando pero el onLoad no siempre se dispara
    const timer = setTimeout(() => {
      setPdfLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-como md:text-4xl lg:text-5xl">
            Catálogo MVV Natural 2025
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-secondary md:text-lg">
            Explora nuestro catálogo completo de suplementos naturales. Navega por todas las páginas aquí abajo.
          </p>
          
          {/* Download Button */}
          <div className="mt-6 flex justify-center">
            <a
              href="/Catalogo-Mvvnatural.pdf"
              download="Catalogo-MVV-Natural-2025.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-como px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#3d6849] hover:shadow-2xl active:scale-95 md:px-10 md:text-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar Catálogo PDF
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xl" style={{ height: '80vh', minHeight: '600px' }}>
            {/* Loading overlay - se oculta después de 2 segundos */}
            {!pdfLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-como border-t-transparent"></div>
                <p className="mt-4 text-como font-medium">Cargando catálogo...</p>
              </div>
            )}
            
            {/* PDF Iframe - siempre visible */}
            <iframe
              src="/Catalogo-Mvvnatural.pdf#toolbar=1&navpanes=1&scrollbar=1&view=Fit&zoom=page-fit"
              className="h-full w-full border-0"
              title="Catálogo MVV Natural 2025"
              onLoad={() => setPdfLoaded(true)}
            />
            
            {/* Fallback for mobile devices */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 lg:hidden">
              <a
                href="/Catalogo-Mvvnatural.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-como/90 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-como active:scale-95"
              >
                <span>📱</span>
                Abrir en pantalla completa
              </a>
            </div>
          </div>

          {/* Mobile alternative */}
          <div className="mt-4 rounded-lg bg-ecru-white p-4 text-center text-sm text-text-secondary lg:hidden">
            <p>💡 <strong>Tip:</strong> En dispositivos móviles, puedes descargar el catálogo o abrirlo en pantalla completa para una mejor experiencia.</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-text-secondary text-lg">
            ¿Encontraste el producto que buscas?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/productos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-como px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#3d6849] active:scale-95"
            >
              Ver Todos los Productos
            </a>
            <a
              href="https://wa.me/526312982043?text=Hola,%20vi%20su%20catálogo%20y%20me%20interesa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-como bg-white px-8 py-4 text-base font-bold text-como transition-all duration-300 hover:bg-ecru-white active:scale-95"
            >
              <span className="text-xl">💬</span>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

