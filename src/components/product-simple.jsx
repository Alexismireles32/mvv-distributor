"use client";

import React from "react";
import { useWhatsApp } from "./home-wrapper";
import { ProductSEO } from "./product-seo";
import { BiCheck } from "react-icons/bi";

export function ProductSimple({ productName, productImage, productUrl, description, benefits, ingredients, howToUse }) {
  const onOpenWhatsApp = useWhatsApp();

  const handleClick = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    }
  };

  return (
    <>
      <ProductSEO
        productName={productName}
        productImage={productImage}
        productUrl={productUrl}
        description={description}
      />
      <section className="px-[5%] py-12 md:py-16 lg:py-20">
        <div className="container max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="overflow-hidden rounded-2xl bg-white/5">
              <img
                src={productImage}
                alt={`${productName} - MVV Natural`}
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              {/* Product Name */}
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {productName}
              </h1>

              {/* Price Message */}
              <div className="mb-4 rounded-lg bg-ecru-white p-3 md:p-4">
                <p className="text-center text-sm font-semibold text-como md:text-base">
                  💬 Cotiza precio de menudeo o mayoreo por WhatsApp
                </p>
              </div>

              {/* Description */}
              {description && (
                <p className="mb-6 text-base leading-relaxed text-text-secondary md:text-lg">
                  {description}
                </p>
              )}

              {/* Benefits */}
              {benefits && benefits.length > 0 && (
                <div className="mb-6 space-y-2">
                  <h2 className="mb-3 text-lg font-bold md:text-xl">✨ Beneficios Principales</h2>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <BiCheck className="h-6 w-6 flex-shrink-0 text-como" />
                      <span className="text-sm text-text-secondary md:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={handleClick}
                type="button"
                className="w-full bg-como hover:bg-[#3d6849] text-white font-bold text-base px-10 py-5 min-h-[56px] md:text-lg shadow-xl hover:shadow-2xl active:scale-95 md:hover:scale-105 transition-all duration-300 rounded-full"
                aria-label="Comprar por WhatsApp"
              >
                <span className="flex items-center justify-center gap-2 md:gap-3">
                  <span>Comprar por WhatsApp</span>
                  <span className="text-xl md:text-2xl">🇲🇽🇺🇸</span>
                </span>
              </button>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-text-secondary md:text-sm">
                <span className="flex items-center gap-1">
                  ✅ 100% Original
                </span>
                <span className="flex items-center gap-1">
                  📦 Envío 1-3 días
                </span>
                <span className="flex items-center gap-1">
                  🛡️ 15 años de experiencia
                </span>
              </div>
            </div>
          </div>

          {/* Additional Information Section - Full Width Below */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Ingredients */}
            {ingredients && ingredients.length > 0 && (
              <div className="rounded-2xl bg-ecru-white p-6 md:p-8">
                <h2 className="mb-4 text-xl font-bold text-como md:text-2xl">🌿 Ingredientes Naturales</h2>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-secondary md:text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-como"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Wholesale Pricing - Professional Design */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-como/10">
                  <span className="text-xl">💼</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 md:text-2xl">Precios de Mayoreo</h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Retail Card */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 transition-all duration-300 hover:border-como hover:shadow-md">
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-como/5 transition-transform duration-300 group-hover:scale-150"></div>
                  <div className="relative">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-como/10 text-2xl transition-colors duration-300 group-hover:bg-como/20">
                      🛒
                    </div>
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-como">1-9</span>
                      <span className="text-sm font-medium text-gray-600">piezas</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Precio Menudeo</p>
                    <p className="mt-1 text-xs text-gray-500">Ideal para uso personal</p>
                  </div>
                </div>

                {/* Wholesale Card */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-como bg-gradient-to-br from-como to-[#3d6849] p-5 shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/10"></div>
                  <div className="relative">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 text-2xl backdrop-blur-sm">
                      📦
                    </div>
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">10+</span>
                      <span className="text-sm font-medium text-white/90">piezas</span>
                    </div>
                    <p className="text-sm font-semibold text-white">Precio Mayoreo</p>
                    <p className="mt-1 text-xs text-white/80">Descuentos especiales</p>
                    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <span>✨</span> Mejor precio
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Bottom */}
              <div className="mt-6 rounded-xl bg-gradient-to-r from-ecru-white to-gray-50 p-4 text-center">
                <p className="mb-2 text-sm font-semibold text-gray-700">¿Necesitas más información?</p>
                <button
                  onClick={onOpenWhatsApp}
                  className="inline-flex items-center gap-2 text-sm font-bold text-como transition-colors hover:text-[#3d6849]"
                >
                  <span className="text-lg">💬</span>
                  Cotiza tu mejor precio por WhatsApp
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* How to Use - Optional */}
          {howToUse && (
            <div className="mt-8 rounded-2xl border-2 border-como/20 bg-white p-6 md:p-8">
              <h2 className="mb-4 text-xl font-bold text-como md:text-2xl">📋 Modo de Uso</h2>
              <p className="text-sm leading-relaxed text-text-secondary md:text-base">{howToUse}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
