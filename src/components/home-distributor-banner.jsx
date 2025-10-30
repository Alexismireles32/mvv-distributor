"use client";

import React from 'react';
import { useCart } from './customer-cart';

export function HomeDistributorBanner({ variant = 'full' }) {
  const cart = useCart();
  const distributor = cart?.distributorInfo || null;

  if (!distributor) return null;

  const phone = (distributor.phone || '').replace(/\D/g, '');
  const whatsappText = encodeURIComponent('Hola, me gustaría hacer una orden de productos para bajar de peso y salud.');

  if (variant === 'compact') {
    return (
      <section className="px-[5%] py-3 bg-[#FAF8F3] border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex items-center gap-3 text-gray-900">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
            {distributor.photo_url ? (
              <img src={distributor.photo_url} alt="Foto" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">Sin foto</div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">{distributor.name} {distributor.last_name}</span>
            <span className="text-xs text-gray-500">• {distributor.country || 'Estados Unidos'}, {distributor.state}</span>
            <span className="ml-2 text-[10px] uppercase tracking-wide bg-[#FFD700] text-gray-900 px-2 py-0.5 rounded">Autorizado</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={`https://wa.me/${phone}?text=${whatsappText}`}
              target="_blank"
              className="px-3 py-1.5 bg-green-600 text-white text-xs hover:bg-green-700 rounded-full"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] py-16 bg-[#FAF8F3] border-t border-b border-gray-200">
      <div className="max-w-xl md:max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="relative mb-5">
          <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md">
            {distributor.photo_url ? (
              <img src={distributor.photo_url} alt="Foto del distribuidor" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Sin foto</div>
            )}
          </div>
          <div className="absolute -top-3 -right-3 rotate-12 bg-[#FFD700] text-como px-3 py-1 text-[10px] md:text-xs font-bold shadow-md animate-pulse rounded-full">Autorizado</div>
        </div>

        <div className="w-full">
          <p className="text-2xl md:text-3xl text-gray-900 font-semibold">{distributor.name} {distributor.last_name}</p>
          <p className="mt-1.5 text-base md:text-lg text-gray-600">{distributor.country || 'Estados Unidos'}, {distributor.state}</p>
        </div>

        <div className="mt-6 w-full flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/${phone}?text=${whatsappText}`}
            target="_blank"
            className="px-7 py-3 bg-green-600 text-white text-sm md:text-base hover:bg-green-700 rounded-full shadow-md w-full sm:w-auto"
          >
            Contactar por WhatsApp
          </a>
          <a
            href={`/productos?code=${distributor.code}`}
            className="px-7 py-3 bg-black text-white text-sm md:text-base hover:bg-gray-800 rounded-full shadow-md w-full sm:w-auto"
          >
            Empezar Orden
          </a>
        </div>
        <div className="mt-10 h-px bg-gray-200 w-full" />
      </div>
    </section>
  );
}


