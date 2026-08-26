"use client";

import { Button } from "@relume_io/relume-ui";
import React, { useState, useEffect, useRef } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useCart } from "./customer-cart";

export function ProductCardWithCart({ product, badge = null }) {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  // Confirms the add where the finger already is. The only lasting feedback used to
  // be the cart badge, ~745px away at the top of a phone screen, so a tap looked
  // like it had done nothing once the toast faded.
  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef(null);

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  // Safe defaults if not within CartProvider
  const isOrderActive = cart?.isOrderActive || false;
  const distributorPrices = cart?.distributorPrices || {};
  const addToCart = cart?.addToCart || (() => {});

  const price = distributorPrices[product.name] || 0;
  const hasPrice = isOrderActive && price > 0;

  const handleAddToCart = () => {
    if (showQuantitySelector) {
      addToCart(product.name, quantity);
      setShowQuantitySelector(false);
      setQuantity(1);
      setJustAdded(true);
      clearTimeout(addedTimer.current);
      addedTimer.current = setTimeout(() => setJustAdded(false), 1600);
    } else {
      setShowQuantitySelector(true);
    }
  };

  return (
    <div className="group">
      {/* Badge */}
      {badge && (
        <div className="relative mb-3 md:mb-4">
          <div className={`absolute -top-2 -right-2 z-10 ${badge.color} text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse`}>
            {badge.text}
          </div>
          <a href={product.slug} className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como bg-white flex items-center justify-center">
            <img
              src={product.image}
              alt={`${product.name} - MVV Natural`}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>
      )}
      {!badge && (
        <a href={product.slug} className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4 bg-white flex items-center justify-center">
          <img
            src={product.image}
            alt={`${product.name} - MVV Natural`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </a>
      )}

      {/* Product Name */}
      <a href={product.slug} className="flex flex-col text-center md:text-md">
        <div className="mb-2">
          <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">
            {product.name}
          </h3>
        </div>
      </a>

      {/* Price (if order is active) */}
      {hasPrice && (
        <p className="text-center text-lg font-medium text-gray-900 mb-2">
          ${price.toFixed(2)}
        </p>
      )}

      {/* Buttons */}
      <div className="space-y-2 mt-3 md:mt-4">
        {/* Add to Cart Button (if order is active and has price) */}
        {hasPrice && (
          <>
            {showQuantitySelector && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                >
                  <BiMinus />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                >
                  <BiPlus />
                </button>
              </div>
            )}
            {/*
              A native button rather than Relume's <Button>: its own background wins
              through the cascade, so the confirmation colour never applied — not via
              a utility class, not via `!important`, not even via an inline style
              (the style attribute was set and the computed colour still did not
              change). Styling this one control directly keeps the success state
              actually visible.
            */}
            <button
              type="button"
              onClick={handleAddToCart}
              aria-live="polite"
              className="w-full rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200"
              // Both colours are inline. Astro splits CSS per page, and an arbitrary
              // class (`bg-[#2C3E2F]`) was emitted into a different page's stylesheet
              // — present on the element with no rule behind it here. Inline styles
              // need nothing generated and cannot be chunked away, so the idle and
              // confirmed states are guaranteed to differ.
              style={{ backgroundColor: justAdded ? '#2C3E2F' : '#4A7C59' }}
            >
              {justAdded ? '✓ Agregado' : showQuantitySelector ? 'Confirmar' : 'Agregar al Carrito'}
            </button>
          </>
        )}

        {/* Ver Producto Button */}
        <Button
          variant="secondary"
          size="sm"
          title={`Ver Producto ${product.name}`}
          className="w-full"
          asChild
        >
          <a href={product.slug}>
            Ver Producto
          </a>
        </Button>
      </div>
    </div>
  );
}

