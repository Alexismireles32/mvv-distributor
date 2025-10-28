"use client";

import React, { useState, useEffect } from 'react';
import { BiTime, BiCheck } from 'react-icons/bi';
import { supabase } from '../lib/supabase';

export function ReminderManager({ distributorCode, invoiceHistory, onBack }) {
  const [selectedDays, setSelectedDays] = useState(['30']);
  const [reminderClients, setReminderClients] = useState([]);

  useEffect(() => {
    calculateReminders();
  }, [selectedDays, invoiceHistory]);

  const calculateReminders = () => {
    const today = new Date();
    const clientsToRemind = [];

    selectedDays.forEach(days => {
      const targetDays = parseInt(days);
      const windowStart = targetDays;
      const windowEnd = targetDays + 7; // Ventana de 7 días

      invoiceHistory.forEach(inv => {
        const daysSince = Math.floor((today - inv.date) / (1000 * 60 * 60 * 24));
        
        if (daysSince >= windowStart && daysSince <= windowEnd) {
          const existingIndex = clientsToRemind.findIndex(c => c.client === inv.client);
          
          if (existingIndex === -1) {
            clientsToRemind.push({
              client: inv.client,
              lastPurchaseDate: inv.date,
              daysSince,
              phone: inv.fullData?.client?.phone || '',
              invoiceId: inv.id
            });
          }
        }
      });
    });

    setReminderClients(clientsToRemind.sort((a, b) => b.daysSince - a.daysSince));
  };

  const handleWhatsApp = (clientPhone) => {
    if (!clientPhone) {
      alert('Este cliente no tiene número de WhatsApp registrado');
      return;
    }

    const cleanPhone = clientPhone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hola ${clientPhone.split(' ')[0] || ''}, esperamos estés bien! 🌟\n\n` +
      `Hace tiempo que no te contactamos. ¿Te gustaría volver a ordenar productos MVV Natural?` +
      `\n\nTenemos excelentes promociones y nuevos productos disponibles para ti.\n\n` +
      `¿Te gustaría recibir más información? 😊`
    );
    
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const reminderOptions = [
    { value: '30', label: '30 días' },
    { value: '35', label: '35 días' },
    { value: '45', label: '45 días' },
    { value: '60', label: '60+ días' }
  ];

  const toggleDaySelection = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-como flex items-center gap-3">
                <BiTime className="w-8 h-8" />
                Recordatorios de Clientes
              </h1>
              <p className="text-gray-600 mt-2">Contacta a clientes según tiempo de compra</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-como mb-4 flex items-center gap-2">
            <BiCheck className="w-6 h-6" />
            Selecciona los Recordatorios
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Elige cuántos días desde la última compra quieres recibir recordatorios:
          </p>
          
          <div className="flex flex-wrap gap-3">
            {reminderOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleDaySelection(option.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedDays.includes(option.value)
                    ? 'bg-como text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedDays.includes(option.value) && '✓ '}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reminders List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-como mb-4">
            Clientes para Contactar ({reminderClients.length})
          </h2>

          {reminderClients.length > 0 ? (
            <div className="space-y-3">
              {reminderClients.map((client, index) => (
                <div 
                  key={index}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{client.client}</h3>
                      <p className="text-sm text-gray-600">
                        Última compra: {client.lastPurchaseDate.toLocaleDateString('es-MX')} 
                        ({client.daysSince} días atrás)
                      </p>
                    </div>
                    <button
                      onClick={() => handleWhatsApp(client.phone)}
                      disabled={!client.phone}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>💬</span>
                      <span>Contactar WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🎉</span>
              <p className="text-gray-600 text-lg">
                No hay clientes para contactar según los criterios seleccionados
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Recomendación:</strong> Contacta a tus clientes regularmente para mantener la relación 
            y fomentar re-compras. Los clientes que no compran después de 60 días tienen mayor probabilidad 
            de no volver a comprar.
          </p>
        </div>
      </div>
    </div>
  );
}

