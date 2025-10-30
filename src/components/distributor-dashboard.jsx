"use client";

import React, { useState, useMemo } from 'react';
import { BiTrendingUp, BiMoney, BiUser, BiPackage } from 'react-icons/bi';

export function DistributorDashboard({ distributorInfo, invoiceHistory, inventory, onViewChange }) {
  const [timeFilter, setTimeFilter] = useState('monthly'); // daily, weekly, monthly, yearly

  // Filter confirmed invoices only
  const confirmedInvoices = invoiceHistory.filter(inv => inv.confirmed);

  // Calculate statistics based on time filter
  const stats = useMemo(() => {
    const now = new Date();
    let filteredInvoices = [];

    switch (timeFilter) {
      case 'daily':
        filteredInvoices = confirmedInvoices.filter(inv => {
          const invDate = new Date(inv.date);
          return invDate.toDateString() === now.toDateString();
        });
        break;
      case 'weekly':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        filteredInvoices = confirmedInvoices.filter(inv => {
          const invDate = new Date(inv.date);
          return invDate >= weekStart;
        });
        break;
      case 'monthly':
        filteredInvoices = confirmedInvoices.filter(inv => {
          const invDate = new Date(inv.date);
          return invDate.getMonth() === now.getMonth() && invDate.getFullYear() === now.getFullYear();
        });
        break;
      case 'yearly':
        filteredInvoices = confirmedInvoices.filter(inv => {
          const invDate = new Date(inv.date);
          return invDate.getFullYear() === now.getFullYear();
        });
        break;
      default:
        filteredInvoices = confirmedInvoices;
    }

    return {
      totalInvoices: filteredInvoices.length,
      totalRevenue: filteredInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
      uniqueClients: new Set(filteredInvoices.map(inv => inv.client)).size,
      pendingInvoices: invoiceHistory.filter(inv => !inv.confirmed).length
    };
  }, [confirmedInvoices, invoiceHistory, timeFilter]);

  // Calculate top products from confirmed invoices only
  const productCounts = {};
  confirmedInvoices.forEach(inv => {
    if (inv.products) {
      Object.keys(inv.products).forEach(product => {
        productCounts[product] = (productCounts[product] || 0) + inv.products[product];
      });
    }
  });

  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate inventory alerts
  const lowStockProducts = inventory ? Object.entries(inventory).filter(([_, qty]) => qty < 10) : [];

  const timeFilterOptions = [
    { value: 'daily', label: 'Hoy' },
    { value: 'weekly', label: 'Esta Semana' },
    { value: 'monthly', label: 'Este Mes' },
    { value: 'yearly', label: 'Este Año' }
  ];

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Dashboard</h1>
              <p className="text-sm text-gray-500">
                {distributorInfo.name} {distributorInfo.last_name} • {distributorInfo.code}
              </p>
            </div>
            <button 
              onClick={() => onViewChange('products')} 
              className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium w-full sm:w-auto"
            >
              Crear Factura
            </button>
          </div>

          {/* Time Filter */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Período de Análisis</h2>
            <div className="flex flex-wrap gap-2">
              {timeFilterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setTimeFilter(option.value)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    timeFilter === option.value
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Herramientas</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onViewChange('inventory')}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Inventario
              </button>
              <button
                onClick={() => onViewChange('prices')}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Precios
              </button>
              <button
                onClick={() => onViewChange('paymentMethods')}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Métodos de Pago
              </button>
              <button
                onClick={() => onViewChange('contacts')}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Contactos
              </button>
              <button
                onClick={() => onViewChange('pdf-export')}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Exportar PDF
              </button>
            </div>
          </div>

          {/* Stats - Clean Text Only */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 pb-12 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ventas Confirmadas</p>
              <p className="text-3xl font-light text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
              {stats.pendingInvoices > 0 && (
                <p className="text-xs text-gray-500 mt-1">{stats.pendingInvoices} pendientes</p>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Facturas</p>
              <p className="text-3xl font-light text-gray-900">{stats.totalInvoices}</p>
              {stats.pendingInvoices > 0 && (
                <p className="text-xs text-gray-500 mt-1">{stats.pendingInvoices} por confirmar</p>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clientes</p>
              <p className="text-3xl font-light text-gray-900">{stats.uniqueClients}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Alertas Stock</p>
              <p className="text-3xl font-light text-gray-900">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Top Productos</h2>
          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map(([product, qty]) => (
                <div key={product} className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-base text-gray-900">{product}</span>
                  <span className="text-sm text-gray-500">{qty} unidades</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Aún no hay productos vendidos</p>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">Stock Bajo</h2>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-4">
              {lowStockProducts.slice(0, 5).map(([product, qty]) => (
                <div key={product} className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-base text-gray-900">{product}</span>
                  <span className="text-sm text-gray-500">{qty} unidades</span>
                </div>
              ))}
              <button 
                onClick={() => onViewChange('inventory')}
                className="mt-6 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Ver Inventario Completo
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500 mb-6">Todo el inventario está actualizado</p>
              <button 
                onClick={() => onViewChange('inventory')}
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Gestionar Inventario
              </button>
            </div>
          )}
        </div>

        {/* Recent Invoices */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Facturas Recientes</h2>
            <button 
              onClick={() => onViewChange('history')}
              className="text-sm text-gray-900 hover:underline"
            >
              Ver Todo →
            </button>
          </div>
          {invoiceHistory.length > 0 ? (
            <div className="space-y-4">
              {invoiceHistory.slice(0, 5).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-base text-gray-900">{inv.client}</p>
                    <p className="text-xs text-gray-500 mt-1">{inv.date.toLocaleDateString('es-MX')}</p>
                  </div>
                  <p className="text-base font-medium text-gray-900">${inv.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Aún no hay facturas generadas</p>
          )}
        </div>
      </div>
    </div>
  );
}

