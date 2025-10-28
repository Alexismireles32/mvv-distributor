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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-como flex items-center gap-3">
                <BiDollar className="w-8 h-8" />
                Mis Precios
              </h1>
              <p className="text-gray-600 mt-2">Configura tus precios por defecto</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 Configura tus precios estándar. Estos se autocompletarán al crear facturas (podrás modificarlos).
          </p>
        </div>

        {/* Prices List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRODUCTS.map((product) => {
              const currentPrice = prices[product.name] || 0;

              return (
                <div key={product.name} className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded-lg border"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">$</span>
                        <input
                          type="number"
                          value={currentPrice}
                          onChange={(e) => updatePrice(product.name, e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg text-lg font-bold focus:ring-2 focus:ring-como"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={savePrices}
            disabled={saving}
            className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Guardar Precios</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

