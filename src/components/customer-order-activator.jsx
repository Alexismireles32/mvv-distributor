"use client";

import React, { useState } from 'react';
import { useCart } from './customer-cart';

export function CustomerOrderActivator() {
  const { isOrderActive, activateOrder, distributorInfo } = useCart();
  const [distributorCode, setDistributorCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (isOrderActive && distributorInfo) {
    return (
      <div className="bg-white border-2 border-black py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">Ordenando con</p>
            <p className="text-lg font-medium text-gray-900">
              {distributorInfo.name} {distributorInfo.last_name} • Código {distributorInfo.code}
            </p>
          </div>
          <div className="text-sm text-gray-600">
            ✓ Precios activos
          </div>
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
    <div className="bg-gray-50 py-8 px-6 border-y border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Iniciar Orden</h2>
          <p className="text-sm text-gray-600">
            Ingresa el código de tu distribuidor para ver precios y hacer tu orden
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="text"
            value={distributorCode}
            onChange={(e) => setDistributorCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleActivate()}
            placeholder="Código de Distribuidor"
            className="flex-1 px-4 py-3 border border-gray-300 text-base focus:outline-none focus:border-black"
            disabled={loading}
          />
          <button
            onClick={handleActivate}
            disabled={loading || !distributorCode.trim()}
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Verificando...' : 'Activar Orden'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Si no tienes un distribuidor, puedes buscar uno en{' '}
          <a href="/verificar-distribuidor" className="underline hover:text-black">
            Verificar Distribuidor
          </a>
        </p>
      </div>
    </div>
  );
}

