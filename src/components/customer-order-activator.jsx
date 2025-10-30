"use client";

import React, { useState } from 'react';
import { useCart } from './customer-cart';

export function CustomerOrderActivator() {
  const cart = useCart();
  const [distributorCode, setDistributorCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Return null if not within CartProvider
  if (!cart) return null;
  
  const { isOrderActive, activateOrder, distributorInfo } = cart;

  if (isOrderActive && distributorInfo) {
    return (
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-900">
            Ordenando con <span className="font-medium">{distributorInfo.name} {distributorInfo.last_name}</span> • Código {distributorInfo.code}
          </p>
          <span className="text-xs text-white bg-black px-2 py-1">Precios activos</span>
        </div>
      </div>
    );
  }

  const handleActivate = async () => {
    if (!distributorCode.trim()) {
      alert('Por favor ingresa un código de distribuidor');
      return;
    }

    setLoading(true);
    const success = await activateOrder(distributorCode.trim());
    setLoading(false);

    if (!success) {
      setDistributorCode('');
    }
  };

  return (
    <div className="bg-white py-4 px-4 border-b border-gray-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm text-gray-900 font-medium">Iniciar orden</span>
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={distributorCode}
              onChange={(e) => setDistributorCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
              placeholder="Código del distribuidor"
              className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
              disabled={loading}
            />
            <button
              onClick={handleActivate}
              disabled={loading || !distributorCode.trim()}
              className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Verificando…' : 'Activar'}
            </button>
          </div>
        </div>
        <div className="mt-2">
          <a href="/verificar-distribuidor" className="text-xs text-gray-500 hover:text-black underline">
            ¿No tienes distribuidor? Busca uno aquí
          </a>
        </div>
      </div>
    </div>
  );
}

