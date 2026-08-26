"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from './customer-cart';

export function CustomerOrderActivator() {
  const cart = useCart();
  const [distributorCode, setDistributorCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { isOrderActive, activateOrder, distributorInfo } = cart || {};

  // Auto-activate from query param ?code=123.
  // This hook must run before any conditional return: an early `if (!cart) return null`
  // used to sit above it, so a render where the cart context was missing called fewer
  // hooks than one where it was present — React throws "rendered more hooks than
  // during the previous render" the moment those two renders alternate.
  useEffect(() => {
    if (!cart) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code && /^\d{3}$/.test(code)) {
        setDistributorCode(code);
        handleActivate(code);
      }
    } catch (_) {}
    // Mount-only on purpose. `cart` is NOT a valid dependency here: CartProvider
    // builds its context value inline, so it is a fresh object on every render and
    // would re-fire this effect (and re-activate the order) in an endless loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Not within CartProvider — render nothing, but only after all hooks have run.
  if (!cart) return null;

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

  const handleActivate = async (overrideCode) => {
    // Only treat the argument as a code when it really is a string. Passing this
    // straight to onClick handed React's SyntheticEvent in as `overrideCode`, so
    // `.trim()` was called on an event object — the TypeError was swallowed by the
    // async function and the "Activar" button silently did nothing. Pressing Enter
    // worked, because that path called handleActivate() with no argument.
    const codeToUse = String(typeof overrideCode === 'string' ? overrideCode : distributorCode).trim();
    if (!codeToUse) {
      alert('Por favor ingresa un código de distribuidor');
      return;
    }

    setLoading(true);
    const success = await activateOrder(codeToUse);
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
              type="tel"
              value={distributorCode}
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, '').slice(0,3);
                setDistributorCode(numeric);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
              placeholder="Código del distribuidor"
              className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
              disabled={loading}
            />
            <button
              onClick={() => handleActivate()}
              disabled={loading || !/^\d{3}$/.test(distributorCode)}
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

