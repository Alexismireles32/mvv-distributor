"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const USA_PAYMENT_METHODS = ['Zelle', 'Venmo', 'Cash App', 'PayPal', 'Credit Card', 'Cash'];
const MEXICO_PAYMENT_METHODS = ['OXXO', 'SPEI', 'Transferencia', 'Efectivo', 'Tarjeta'];

export function PaymentMethodsManager({ distributorCode, onBack }) {
  const [selectedUSA, setSelectedUSA] = useState([]);
  const [selectedMEX, setSelectedMEX] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPaymentMethods();
  }, [distributorCode]);

  const loadPaymentMethods = async () => {
    try {
      if (!supabase) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('distributors')
        .select('payment_methods_usa, payment_methods_mexico')
        .eq('code', distributorCode)
        .single();

      if (!error && data) {
        setSelectedUSA(Array.isArray(data.payment_methods_usa) ? data.payment_methods_usa : []);
        setSelectedMEX(Array.isArray(data.payment_methods_mexico) ? data.payment_methods_mexico : []);
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMethodUSA = (method) => {
    setSelectedUSA(prev => prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]);
  };
  const toggleMethodMEX = (method) => {
    setSelectedMEX(prev => prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]);
  };

  const savePaymentMethods = async () => {
    try {
      if (!supabase) {
        alert('Supabase no disponible');
        return;
      }

      setSaving(true);

      const updateData = {
        payment_methods_usa: selectedUSA,
        payment_methods_mexico: selectedMEX
      };

      const { error } = await supabase
        .from('distributors')
        .update(updateData)
        .eq('code', distributorCode);

      if (error) throw error;

      alert('✅ Métodos de pago guardados exitosamente');
    } catch (error) {
      console.error('Error saving payment methods:', error);
      alert('Error al guardar métodos de pago');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Cargando métodos de pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Métodos de Pago</h1>
              <p className="text-sm text-gray-500">Selecciona los métodos que aceptas (USA y/o México)</p>
            </div>
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-900 self-start"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* USA Methods */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">USA</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USA_PAYMENT_METHODS.map(method => {
              const isSelected = selectedUSA.includes(method);
              return (
                <button key={method} onClick={() => toggleMethodUSA(method)}
                  className={`px-5 py-3 border-2 text-left transition-all ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{method}</span>
                    {isSelected && <span className="text-black">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mexico Methods */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">México</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MEXICO_PAYMENT_METHODS.map(method => {
              const isSelected = selectedMEX.includes(method);
              return (
                <button key={method} onClick={() => toggleMethodMEX(method)}
                  className={`px-5 py-3 border-2 text-left transition-all ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{method}</span>
                    {isSelected && <span className="text-black">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="mb-8 p-4 bg-gray-50 border-l-4 border-black">
          <p className="text-sm text-gray-700">
            Los clientes solo verán los métodos de pago que selecciones aquí al hacer sus órdenes.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={savePaymentMethods}
          disabled={saving || (selectedUSA.length === 0 && selectedMEX.length === 0)}
          className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Métodos de Pago'}
        </button>
        {(selectedUSA.length === 0 && selectedMEX.length === 0) && (
          <p className="mt-4 text-sm text-red-600">Debes seleccionar al menos un método de pago</p>
        )}
      </div>
    </div>
  );
}

