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
    <section className="px-[5%] py-12 bg-white border-b border-gray-200">
      <div className="max-w-md md:max-w-3xl mx-auto text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 mx-auto shadow-sm">
            {distributor.photo_url ? (
              <img src={distributor.photo_url} alt="Foto del distribuidor" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Sin foto</div>
            )}
          </div>
          <div className="absolute -top-3 -right-3 rotate-12 bg-[#FFD700] text-como px-3 py-1 text-[10px] md:text-xs font-bold shadow-md animate-pulse rounded-full">Autorizado</div>
        </div>

        <div className="mt-5">
          <p className="text-xl md:text-2xl text-gray-900 font-semibold">{distributor.name} {distributor.last_name}</p>
          <p className="mt-1 text-sm md:text-base text-gray-500">{distributor.country || 'Estados Unidos'}, {distributor.state}</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href={`https://wa.me/${phone}?text=${whatsappText}`}
            target="_blank"
            className="px-5 py-3 bg-green-600 text-white text-sm hover:bg-green-700 rounded-full shadow-md w-full sm:w-auto"
          >
            Contactar por WhatsApp
          </a>
          <a
            href={`/productos?code=${distributor.code}`}
            className="px-5 py-3 bg-black text-white text-sm hover:bg-gray-800 rounded-full shadow-md w-full sm:w-auto"
          >
            Empezar Orden
          </a>
        </div>
      </div>
    </section>
  );
}


