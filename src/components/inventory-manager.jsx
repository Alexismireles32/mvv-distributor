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

  const getStockStatus = (qty) => {
    if (qty === 0) return 'bg-red-100 text-red-800 border-red-300';
    if (qty < 10) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-green-100 text-green-800 border-green-300';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-como flex items-center gap-3">
                <BiPackage className="w-8 h-8" />
                Gestión de Inventario
              </h1>
              <p className="text-gray-600 mt-2">Administra el stock de tus productos</p>
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
            💡 Ingresa la cantidad de cada producto que tienes en stock. 
            El sistema restará automáticamente al generar facturas y te alertará cuando esté bajo.
          </p>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            {PRODUCTS.map((product) => {
              const currentStock = inventory[product.name] || 0;
              const status = getStockStatus(currentStock);

              return (
                <div key={product.name} className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-lg border"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
                          <button
                            onClick={() => updateStock(product.name, currentStock - 1)}
                            className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                            disabled={currentStock === 0}
                          >
                            <BiMinus className="w-5 h-5" />
                          </button>
                          <input
                            type="number"
                            value={currentStock}
                            onChange={(e) => updateStock(product.name, parseInt(e.target.value) || 0)}
                            className="w-20 text-center font-bold text-lg border-0 bg-transparent"
                            min="0"
                          />
                          <button
                            onClick={() => updateStock(product.name, currentStock + 1)}
                            className="w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                          >
                            <BiPlus className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Stock Status */}
                        <div className={`px-4 py-2 rounded-lg border-2 ${status}`}>
                          <span className="font-semibold">
                            {currentStock === 0 ? '❌ Sin stock' :
                             currentStock < 10 ? '⚠️ Stock bajo' :
                             '✅ Stock disponible'}
                          </span>
                        </div>
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
            onClick={saveInventory}
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
                <span>Guardar Inventario</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

