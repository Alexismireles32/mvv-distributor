"use client";

import { formatCurrencyIntl } from '../lib/currency';
import React, { useState, useEffect } from 'react';
import { BiSortUp, BiSortDown, BiMessage, BiTime, BiDollar } from 'react-icons/bi';

export function ContactManager({ distributorCode, invoiceHistory, onBack, distributorCountry }) {
  const [contacts, setContacts] = useState([]);
  const [sortBy, setSortBy] = useState('amount'); // 'amount' or 'time'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'

  useEffect(() => {
    processContacts();
  }, [invoiceHistory, sortBy, sortOrder]);

  const processContacts = () => {
    if (!Array.isArray(invoiceHistory) || invoiceHistory.length === 0) {
      setContacts([]);
      return;
    }

    const confirmedInvoices = invoiceHistory.filter(inv => inv && inv.confirmed);
    const sourceInvoices = confirmedInvoices.length > 0 ? confirmedInvoices : invoiceHistory;

    const contactMap = new Map();
    const today = new Date();

    sourceInvoices.forEach(inv => {
      if (!inv) return;

      const clientDetails = inv.fullData?.client || {};
      const fallbackName = `${clientDetails.firstName || ''} ${clientDetails.lastName || ''}`.trim();
      const clientName = (inv.client || fallbackName || '').trim();

      if (!clientName) return;

      const purchaseDate = inv.date instanceof Date ? inv.date : new Date(inv.date);
      if (!(purchaseDate instanceof Date) || Number.isNaN(purchaseDate.getTime())) {
        return;
      }

      if (!contactMap.has(clientName)) {
        contactMap.set(clientName, {
          name: clientName,
          phone: clientDetails.phone || '',
          email: clientDetails.email || '',
          clientNumber: clientDetails.clientNumber || '',
          totalAmount: 0,
          totalInvoices: 0,
          lastPurchaseDate: null,
          daysSinceLastPurchase: 0,
          allPurchases: []
        });
      }

      const contact = contactMap.get(clientName);

      if (!contact.phone && clientDetails.phone) contact.phone = clientDetails.phone;
      if (!contact.email && clientDetails.email) contact.email = clientDetails.email;
      if (!contact.clientNumber && clientDetails.clientNumber) contact.clientNumber = clientDetails.clientNumber;

      const invoiceTotal = typeof inv.total === 'number' ? inv.total : parseFloat(inv.total || 0) || 0;

      contact.totalAmount += invoiceTotal;
      contact.totalInvoices += 1;
      contact.allPurchases.push({
        date: purchaseDate,
        amount: invoiceTotal,
        id: inv.id
      });

      if (!contact.lastPurchaseDate || purchaseDate > contact.lastPurchaseDate) {
        contact.lastPurchaseDate = purchaseDate;
        contact.daysSinceLastPurchase = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24));
      }
    });

    let contactsArray = Array.from(contactMap.values());

    contactsArray.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'amount') {
        comparison = a.totalAmount - b.totalAmount;
      } else {
        comparison = a.daysSinceLastPurchase - b.daysSinceLastPurchase;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setContacts(contactsArray);
  };

  const getTimeBadge = (days) => {
    if (days >= 30 && days < 35) {
      return { text: '30 días', color: 'bg-red-100 text-red-800', show: true };
    } else if (days >= 35 && days < 45) {
      return { text: '35 días', color: 'bg-red-100 text-red-800', show: true };
    } else if (days >= 45) {
      return { text: '45+ días', color: 'bg-red-100 text-red-800', show: false }; // Badge disappears after 45 days
    }
    return { text: '', color: '', show: false };
  };

  const shouldShowWhatsAppButton = (days) => {
    return days >= 35; // Show WhatsApp button after 35 days
  };

  const handleWhatsApp = (contact) => {
    if (!contact.phone) {
      alert('Este cliente no tiene número de WhatsApp registrado');
      return;
    }

    const cleanPhone = contact.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      alert('No se encontró un número válido para WhatsApp');
      return;
    }
    const message = encodeURIComponent(
      `Hola ${contact.name.split(' ')[0] || ''}, esperamos estés bien! 🌟\n\n` +
      `Hace tiempo que no te contactamos. ¿Te gustaría volver a ordenar productos MVV Natural?` +
      `\n\nTenemos excelentes promociones y nuevos productos disponibles para ti.\n\n` +
      `¿Te gustaría recibir más información? 😊`
    );
    
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  // Currency follows the distributor's country rather than always saying USD.
  const formatCurrency = (amount) => formatCurrencyIntl(amount, distributorCountry);

  const formatDate = (date) => {
    if (!date) return 'Sin registro';
    const value = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(value.getTime())) return 'Sin registro';
    return value.toLocaleDateString('es-MX');
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900">Gestión de Contactos</h1>
            <p className="text-sm text-gray-500 mt-2">Organiza y contacta a tus clientes</p>
          </div>
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Volver al Dashboard
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Sort by */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Ordenar por:</span>
            <button
              onClick={() => setSortBy('amount')}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                sortBy === 'amount' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BiDollar />
              Cantidad
            </button>
            <button
              onClick={() => setSortBy('time')}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                sortBy === 'time' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BiTime />
              Tiempo
            </button>
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Orden:</span>
            <button
              onClick={() => setSortOrder('desc')}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                sortOrder === 'desc' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BiSortDown />
              {sortBy === 'amount' ? 'Mayor a menor' : 'Más reciente'}
            </button>
            <button
              onClick={() => setSortOrder('asc')}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                sortOrder === 'asc' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BiSortUp />
              {sortBy === 'amount' ? 'Menor a mayor' : 'Más antiguo'}
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contactos ({contacts.length})</h2>
          </div>

          {contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map((contact, index) => {
                const timeBadge = getTimeBadge(contact.daysSinceLastPurchase);
                const showWhatsApp = shouldShowWhatsAppButton(contact.daysSinceLastPurchase);
                
                return (
                  <div 
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="text-base font-medium text-gray-900">{contact.name}</h3>
                        {timeBadge.show && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${timeBadge.color}`}>
                            {timeBadge.text} desde última compra
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Total:</span> {formatCurrency(contact.totalAmount)}
                        </div>
                        <div>
                          <span className="font-medium">Facturas:</span> {contact.totalInvoices}
                        </div>
                        <div>
                          <span className="font-medium">Última compra:</span> {formatDate(contact.lastPurchaseDate)}
                        </div>
                        <div>
                          <span className="font-medium">Hace:</span> {contact.lastPurchaseDate ? `${contact.daysSinceLastPurchase} días` : 'Sin registro'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      {showWhatsApp && contact.phone && (
                        <button
                          onClick={() => handleWhatsApp(contact)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <BiMessage />
                          WhatsApp
                        </button>
                      )}
                      
                      {contact.phone && (
                        <button
                          onClick={() => handleWhatsApp(contact)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          <BiMessage />
                          Contactar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No hay contactos registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
