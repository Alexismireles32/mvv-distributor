"use client";

import React from 'react';
import { useCart } from './customer-cart';

export function HomeDistributorBanner() {
  const cart = useCart();
  const distributor = cart?.distributorInfo || null;

  if (!distributor) return null;

  const phone = (distributor.phone || '').replace(/\D/g, '');
  const whatsappText = encodeURIComponent('Hola, me gustaría hacer una orden de productos para bajar de peso y salud.');

  return (
    <section className="px-[5%] py-14 bg-[#FAF8F3] border-t border-b border-gray-200">
      <div className="max-w-xl md:max-w-3xl mx-auto text-center">
        <div className="relative inline-block">
          <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 mx-auto shadow-md">
            {distributor.photo_url ? (
              <img src={distributor.photo_url} alt="Foto del distribuidor" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Sin foto</div>
            )}
          </div>
          <div className="absolute -top-3 -right-3 rotate-12 bg-[#FFD700] text-como px-3 py-1 text-[10px] md:text-xs font-bold shadow-md animate-pulse rounded-full">Autorizado</div>
        </div>

        <div className="mt-6">
          <p className="text-2xl md:text-3xl text-gray-900 font-semibold">{distributor.name} {distributor.last_name}</p>
          <p className="mt-2 text-base md:text-lg text-gray-600">{distributor.country || 'Estados Unidos'}, {distributor.state}</p>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href={`https://wa.me/${phone}?text=${whatsappText}`}
            target="_blank"
            className="px-6 py-3 bg-green-600 text-white text-sm md:text-base hover:bg-green-700 rounded-full shadow-md w-full sm:w-auto"
          >
            Contactar por WhatsApp
          </a>
          <a
            href={`/productos?code=${distributor.code}`}
            className="px-6 py-3 bg-black text-white text-sm md:text-base hover:bg-gray-800 rounded-full shadow-md w-full sm:w-auto"
          >
            Empezar Orden
          </a>
        </div>
        <div className="mt-8 h-px bg-gray-200" />
      </div>
    </section>
  );
}


