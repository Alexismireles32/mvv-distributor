"use client";

import React, { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { ProductCarousel } from "./product-carousel";
import { WhatsAppContext } from "./home-wrapper";
import { useCart } from "./customer-cart";

export function ProductPageWrapperEnhanced({ productData }) {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  // Safe defaults if not within CartProvider
  const isOrderActive = cart?.isOrderActive || false;
  const distributorPrices = cart?.distributorPrices || {};
  const addToCart = cart?.addToCart || (() => {});
  const distributorInfo = cart?.distributorInfo || null;

  const price = distributorPrices[productData.productName] || 0;
  const hasPrice = isOrderActive && price > 0;

  const handleAddToCart = () => {
    addToCart(productData.productName, quantity);
    setQuantity(1);
  };

  // WhatsApp disabled for distributor site
  const handleOpenWhatsApp = () => {
    // No-op for distributor site
  };

  return (
    <WhatsAppContext.Provider value={handleOpenWhatsApp}>
      {/* Order Active Banner (if applicable) */}
      {isOrderActive && distributorInfo && (
        <div className="bg-gray-50 border-y border-gray-200 py-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Ordenando con</p>
              <p className="text-lg font-medium text-gray-900">
                {distributorInfo.name} {distributorInfo.last_name} • Código {distributorInfo.code}
              </p>
            </div>
            {hasPrice && (
              <div className="text-2xl font-medium text-gray-900">
                ${price.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Details Section */}
      <section className="px-[5%] py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={productData.productImage}
                alt={productData.productName}
                className="w-full max-w-md object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {productData.productName}
              </h1>

              {/* Price & Add to Cart (if order active) */}
              {hasPrice && (
                <div className="mb-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 text-xl"
                      >
                        <BiMinus />
                      </button>
                      <span className="w-16 text-center font-medium text-xl">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 text-xl"
                      >
                        <BiPlus />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-medium text-lg"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              )}

              <p className="mb-6 text-gray-700 leading-relaxed">
                {productData.description}
              </p>

              {/* Benefits */}
              {productData.benefits && productData.benefits.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Beneficios</h2>
                  <ul className="space-y-2">
                    {productData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-como mt-1">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients */}
              {productData.ingredients && productData.ingredients.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Ingredientes</h2>
                  <ul className="space-y-2">
                    {productData.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-como mt-1">•</span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Instructions */}
              {productData.usage && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Modo de Uso</h2>
                  <p className="text-gray-700">{productData.usage}</p>
                </div>
              )}

              {/* Warnings */}
              {productData.warnings && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Advertencias</h2>
                  <p className="text-gray-700 text-sm">{productData.warnings}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel currentProductUrl={productData.productUrl} />
    </WhatsAppContext.Provider>
  );
}

