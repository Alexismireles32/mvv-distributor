"use client";

import React, { useState, useEffect } from 'react';
import { BiDollar } from 'react-icons/bi';
import { api } from '../lib/api';
import { useProducts } from './use-products';

export function PriceManager({ distributorCode, onBack }) {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { products } = useProducts();

  useEffect(() => {
    loadPrices();
  }, [distributorCode]);

  const loadPrices = async () => {
    try {
      setLoading(true);
      const { prices: serverPrices } = await api.myData();
      setPrices(serverPrices || {});
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
      setSaving(true);
      // One request; the server scopes the write to the session's distributor.
      await api.saveSettings({ prices });
      alert('✅ Precios guardados exitosamente');
    } catch (error) {
      console.error('Error saving prices:', error);
      alert(error.message || 'Error al guardar precios');
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
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Precios</h1>
              <p className="text-sm text-gray-500">Configura tus precios por defecto</p>
            </div>
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-900 self-start"
            >
              ← Volver al Dashboard
            </button>
          </div>
        </div>

        {/* Prices List */}
        <div className="space-y-6 mb-12">
          {products.map((product) => {
            const currentPrice = prices[product.name] || 0;

            return (
              <div key={product.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4 sm:gap-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
                  />
                  <h3 className="text-base text-gray-900">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-base text-gray-900">$</span>
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => updatePrice(product.name, e.target.value)}
                    className="w-full sm:w-32 px-3 py-2 border border-gray-300 text-base focus:outline-none focus:border-black"
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

