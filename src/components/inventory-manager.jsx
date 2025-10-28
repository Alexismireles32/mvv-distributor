"use client";

import React, { useState, useEffect } from 'react';
import { BiPackage, BiPlus, BiMinus } from 'react-icons/bi';
import { supabase } from '../lib/supabase';
import { PRODUCTS } from './product-catalog';

export function InventoryManager({ distributorCode, onBack }) {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadInventory();
  }, [distributorCode]);

  const loadInventory = async () => {
    try {
      if (!supabase) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('distributor_code', distributorCode);

      if (!error && data) {
        const invObj = {};
        data.forEach(item => {
          invObj[item.product_name] = item.stock_quantity || 0;
        });
        setInventory(invObj);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = (productName, newQuantity) => {
    setInventory(prev => ({
      ...prev,
      [productName]: Math.max(0, newQuantity)
    }));
  };

  const saveInventory = async () => {
    try {
      if (!supabase) {
        alert('Supabase no disponible');
        return;
      }

      setSaving(true);

      // Upsert para cada producto
      const promises = Object.entries(inventory).map(([productName, quantity]) =>
        supabase
          .from('inventory')
          .upsert({
            distributor_code: distributorCode,
            product_name: productName,
            stock_quantity: quantity,
            updated_at: new Date().toISOString()
          })
      );

      await Promise.all(promises);
      alert('✅ Inventario guardado exitosamente');
    } catch (error) {
      console.error('Error saving inventory:', error);
      alert('Error al guardar inventario');
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-600">Cargando inventario...</p>
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
              <h1 className="text-4xl font-light text-gray-900 mb-2">Inventario</h1>
              <p className="text-sm text-gray-500">Administra el stock de tus productos</p>
            </div>
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Inventory List */}
        <div className="space-y-8 mb-12">
          {PRODUCTS.map((product) => {
            const currentStock = inventory[product.name] || 0;

            return (
              <div key={product.name} className="flex items-center justify-between pb-8 border-b border-gray-200">
                <div className="flex items-center gap-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="text-base text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-xs text-gray-500">
                      {currentStock === 0 ? 'Sin stock' :
                       currentStock < 10 ? 'Stock bajo' :
                       'Stock disponible'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => updateStock(product.name, currentStock - 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      disabled={currentStock === 0}
                    >
                      <BiMinus className="w-4 h-4 text-gray-900" />
                    </button>
                    <input
                      type="number"
                      value={currentStock}
                      onChange={(e) => updateStock(product.name, parseInt(e.target.value) || 0)}
                      className="w-20 text-center text-base border-0 border-l border-r border-gray-300 focus:outline-none"
                      min="0"
                    />
                    <button
                      onClick={() => updateStock(product.name, currentStock + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <BiPlus className="w-4 h-4 text-gray-900" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <button
          onClick={saveInventory}
          disabled={saving}
          className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Inventario'}
        </button>
      </div>
    </div>
  );
}

