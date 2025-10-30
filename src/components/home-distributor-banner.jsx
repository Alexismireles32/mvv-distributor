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
            <span className="ml-2 text-[10px] uppercase tracking-wide bg-[#FFD700] text-gray-900 px-2 py-0.5 rounded">Distribuidor MVV Autorizado</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={`https://wa.me/${phone}?text=${whatsappText}`}
              target="_blank"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs hover:bg-green-700 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.46 0 .16 5.29.16 11.86c0 2.09.55 4.15 1.61 5.95L0 24l6.36-1.73a11.83 11.83 0 0 0 5.7 1.48h.01c6.6 0 11.9-5.29 11.9-11.86 0-3.17-1.24-6.15-3.45-8.41ZM12.07 21.2h-.01a9.89 9.89 0 0 1-5.03-1.38l-.36-.21-3.77 1.02 1.01-3.67-.24-.38a9.74 9.74 0 0 1-1.5-5.13c0-5.45 4.45-9.88 9.93-9.88 2.65 0 5.14 1.03 7.02 2.89a9.81 9.81 0 0 1 2.9 7.01c0 5.45-4.45 9.88-9.95 9.88Zm5.5-7.4c-.3-.16-1.79-.88-2.07-.98-.28-.1-.49-.16-.7.16-.2.31-.8.98-.98 1.18-.18.2-.36.23-.66.08-.3-.16-1.27-.46-2.42-1.48-.89-.78-1.5-1.73-1.68-2.02-.18-.31 0-.47.14-.63.14-.16.3-.4.46-.6.15-.2.2-.34.3-.55.1-.2.05-.39-.03-.55-.08-.16-.7-1.67-.96-2.29-.25-.6-.5-.5-.7-.5l-.6-.01c-.2 0-.55.08-.84.39-.3.31-1.1 1.07-1.1 2.61 0 1.53 1.12 3.01 1.28 3.22.16.2 2.2 3.4 5.33 4.74.75.32 1.34.51 1.8.65.76.24 1.44.21 1.98.13.6-.09 1.79-.73 2.04-1.43.25-.7.25-1.28.18-1.43-.08-.16-.28-.23-.58-.39Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] py-10 border-t border-gray-200">
      <div className="max-w-xl md:max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="relative mb-5">
          <div className="w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md">
            {distributor.photo_url ? (
              <img src={distributor.photo_url} alt="Foto del distribuidor" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Sin foto</div>
            )}
          </div>
          <div className="absolute -top-3 -right-3 rotate-12 bg-[#FFD700] text-como px-3 py-1 text-[10px] md:text-xs font-bold shadow-md animate-pulse rounded-full">Distribuidor MVV Autorizado</div>
        </div>

        <div className="w-full">
          <p className="text-2xl md:text-3xl text-gray-900 font-semibold">{distributor.name} {distributor.last_name}</p>
          <p className="mt-1.5 text-base md:text-lg text-gray-600">{distributor.country || 'Estados Unidos'}, {distributor.state}</p>
        </div>

        <div className="mt-6 w-full flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/${phone}?text=${whatsappText}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white text-sm md:text-base hover:bg-green-700 rounded-full shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.46 0 .16 5.29.16 11.86c0 2.09.55 4.15 1.61 5.95L0 24l6.36-1.73a11.83 11.83 0 0 0 5.7 1.48h.01c6.6 0 11.9-5.29 11.9-11.86 0-3.17-1.24-6.15-3.45-8.41ZM12.07 21.2h-.01a9.89 9.89 0 0 1-5.03-1.38l-.36-.21-3.77 1.02 1.01-3.67-.24-.38a9.74 9.74 0 0 1-1.5-5.13c0-5.45 4.45-9.88 9.93-9.88 2.65 0 5.14 1.03 7.02 2.89a9.81 9.81 0 0 1 2.9 7.01c0 5.45-4.45 9.88-9.95 9.88Zm5.5-7.4c-.3-.16-1.79-.88-2.07-.98-.28-.1-.49-.16-.7.16-.2.31-.8.98-.98 1.18-.18.2-.36.23-.66.08-.3-.16-1.27-.46-2.42-1.48-.89-.78-1.5-1.73-1.68-2.02-.18-.31 0-.47.14-.63.14-.16.3-.4.46-.6.15-.2.2-.34.3-.55.1-.2.05-.39-.03-.55-.08-.16-.7-1.67-.96-2.29-.25-.6-.5-.5-.7-.5l-.6-.01c-.2 0-.55.08-.84.39-.3.31-1.1 1.07-1.1 2.61 0 1.53 1.12 3.01 1.28 3.22.16.2 2.2 3.4 5.33 4.74.75.32 1.34.51 1.8.65.76.24 1.44.21 1.98.13.6-.09 1.79-.73 2.04-1.43.25-.7.25-1.28.18-1.43-.08-.16-.28-.23-.58-.39Z" />
            </svg>
            Contactar por WhatsApp
          </a>
          <a
            href={`/productos?code=${distributor.code}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm md:text-base hover:bg-gray-800 rounded-full shadow-md"
          >
            Empezar Orden
          </a>
        </div>
        {/* Reduced bottom spacing to integrate with following section */}
      </div>
    </section>
  );
}


