"use client";

import React, { useState, useEffect } from 'react';
import { BiDollar } from 'react-icons/bi';
import { supabase } from '../lib/supabase';
import { PRODUCTS } from './product-catalog';

export function PriceManager({ distributorCode, onBack }) {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPrices();
  }, [distributorCode]);

  const loadPrices = async () => {
    try {
      if (!supabase) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('distributor_prices')
        .select('*')
        .eq('distributor_code', distributorCode);

      if (!error && data) {
        const pricesObj = {};
        data.forEach(item => {
          pricesObj[item.product_name] = parseFloat(item.price) || 0;
        });
        setPrices(pricesObj);
      }
    } catch (error) {
      console.error('Error loading prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrice = (productName, newPrice) => {
    setPrices(prev => ({
      ...prev,
      [productName]: Math.max(0, parseFloat(newPrice) || 0)
    }));
  };

  const savePrices = async () => {
    try {
      if (!supabase) {
        alert('Supabase no disponible');
        return;
      }

      setSaving(true);

      // Upsert para cada producto
      const promises = Object.entries(prices).map(([productName, price]) =>
        supabase
          .from('distributor_prices')
          .upsert({
            distributor_code: distributorCode,
            product_name: productName,
            price: price,
            updated_at: new Date().toISOString()
          })
      );

      await Promise.all(promises);
      alert('✅ Precios guardados exitosamente');
    } catch (error) {
      console.error('Error saving prices:', error);
      alert('Error al guardar precios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-600">Cargando precios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">Precios</h1>
              <p className="text-sm text-gray-500">Configura tus precios por defecto</p>
            </div>
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Prices List */}
        <div className="space-y-6 mb-12">
          {PRODUCTS.map((product) => {
            const currentPrice = prices[product.name] || 0;

            return (
              <div key={product.name} className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div className="flex items-center gap-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-contain"
                  />
                  <h3 className="text-base text-gray-900">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-base text-gray-900">$</span>
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => updatePrice(product.name, e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 text-base focus:outline-none focus:border-black"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <button
          onClick={savePrices}
          disabled={saving}
          className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Precios'}
        </button>
      </div>
    </div>
  );
}

