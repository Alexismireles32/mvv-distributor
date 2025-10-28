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
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">Recordatorios</h1>
              <p className="text-sm text-gray-500">Contacta a clientes según tiempo de compra</p>
            </div>
            <button
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Selecciona Días</h2>
          <div className="flex flex-wrap gap-3">
            {reminderOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleDaySelection(option.value)}
                className={`px-6 py-2 text-sm transition-all ${
                  selectedDays.includes(option.value)
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-900 border border-gray-300 hover:border-black'
                }`}
              >
                {selectedDays.includes(option.value) && '✓ '}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reminders List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Clientes para Contactar</h2>
            <span className="text-sm text-gray-500">{reminderClients.length}</span>
          </div>

          {reminderClients.length > 0 ? (
            <div className="space-y-6">
              {reminderClients.map((client, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between pb-6 border-b border-gray-200"
                >
                  <div>
                    <h3 className="text-base text-gray-900 mb-1">{client.client}</h3>
                    <p className="text-xs text-gray-500">
                      Última compra: {client.lastPurchaseDate.toLocaleDateString('es-MX')} • {client.daysSince} días atrás
                    </p>
                  </div>
                  <button
                    onClick={() => handleWhatsApp(client.phone)}
                    disabled={!client.phone}
                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Contactar WhatsApp
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No hay clientes para contactar según los criterios seleccionados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

