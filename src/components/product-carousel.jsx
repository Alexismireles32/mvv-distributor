"use client";

import React, { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

import { PRODUCTS } from './product-catalog';

const allProducts = PRODUCTS.map(product => ({
  name: product.name,
  url: product.slug,
  image: product.image
}));

export function ProductCarousel({ currentProductUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Excluir el producto actual del carousel
  const products = allProducts.filter(p => p.url !== currentProductUrl);

  // Calcular índices para la vista de "centro grande, laterales pequeños"
  const centerIndex = currentIndex;
  const leftIndex = currentIndex > 0 ? currentIndex - 1 : products.length - 1;
  const rightIndex = currentIndex < products.length - 1 ? currentIndex + 1 : 0;

  const visibleProducts = [
    products[leftIndex],
    products[centerIndex],
    products[rightIndex]
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToProduct = (index) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) return null;

  return (
    <section className="px-[5%] py-12 md:py-16 lg:py-20 bg-ecru-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Más Productos</h2>
        
        {/* Desktop Carousel */}
        <div className="hidden md:flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-como text-white hover:bg-[#3d6849] transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Producto anterior"
          >
            <RxChevronLeft className="h-6 w-6" />
          </button>

          {/* Products Grid - 3 visible at a time */}
          <div className="flex items-center justify-center gap-6">
            {visibleProducts.map((product, idx) => {
              const isCenter = idx === 1;
              return (
                <a
                  key={product.url}
                  href={product.url}
                  className={`block transition-all duration-500 ${
                    isCenter ? 'scale-110 z-10' : 'scale-90 opacity-75'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`rounded-lg shadow-xl border-2 transition-all duration-300 ${
                        isCenter 
                          ? 'w-48 h-64 object-cover border-como' 
                          : 'w-36 h-48 object-cover border-gray-300 hover:border-como'
                      }`}
                      loading="lazy"
                    />
                    {isCenter && (
                      <div className="absolute -bottom-8 left-0 right-0 text-center">
                        <p className="text-sm font-semibold text-como">{product.name}</p>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-como text-white hover:bg-[#3d6849] transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Producto siguiente"
          >
            <RxChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Carousel - Scrollable */}
        <div className="md:hidden">
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4" style={{ width: `${products.length * 180}px` }}>
              {products.map((product, idx) => (
                <a
                  key={product.url}
                  href={product.url}
                  className="block snap-start"
                  style={{ minWidth: '160px' }}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-40 h-52 rounded-lg shadow-lg border-2 border-gray-200 object-cover"
                      loading="lazy"
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-semibold text-como line-clamp-2">{product.name}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots (Desktop) */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToProduct(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-como' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al producto ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

