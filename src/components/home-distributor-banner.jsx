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
    <section className="px-[5%] py-6 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
            {distributor.photo_url ? (
              <img src={distributor.photo_url} alt="Foto del distribuidor" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Sin foto</div>
            )}
          </div>
          <div className="absolute -top-2 -right-2 rotate-12 bg-[#FFD700] text-como px-2 py-0.5 text-[10px] font-bold shadow-md animate-pulse">Autorizado</div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-900 font-medium">{distributor.name} {distributor.last_name}</p>
          <p className="text-xs text-gray-500">{distributor.country || 'Estados Unidos'}, {distributor.state}</p>
        </div>

        <div className="flex gap-2">
          <a
            href={`https://wa.me/${phone}?text=${whatsappText}`}
            target="_blank"
            className="px-3 py-2 bg-green-600 text-white text-xs hover:bg-green-700"
          >
            WhatsApp
          </a>
          <a
            href={`/productos?code=${distributor.code}`}
            className="px-3 py-2 bg-black text-white text-xs hover:bg-gray-800"
          >
            Empezar Orden
          </a>
        </div>
      </div>
    </section>
  );
}


