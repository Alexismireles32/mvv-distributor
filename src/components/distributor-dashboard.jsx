"use client";

import React from 'react';
import { BiTrendingUp, BiMoney, BiUser, BiPackage, BiBell } from 'react-icons/bi';

export function DistributorDashboard({ distributorInfo, invoiceHistory, inventory, onViewChange }) {
  // Calculate statistics from invoice history
  const stats = {
    totalInvoices: invoiceHistory.length,
    totalRevenue: invoiceHistory.reduce((sum, inv) => sum + (inv.total || 0), 0),
    uniqueClients: new Set(invoiceHistory.map(inv => inv.client)).size,
    thisMonth: invoiceHistory.filter(inv => {
      const invDate = new Date(inv.date);
      const now = new Date();
      return invDate.getMonth() === now.getMonth() && invDate.getYear() === now.getYear();
    }).length,
    thisMonthRevenue: invoiceHistory
      .filter(inv => {
        const invDate = new Date(inv.date);
        const now = new Date();
        return invDate.getMonth() === now.getMonth() && invDate.getYear() === now.getYear();
      })
      .reduce((sum, inv) => sum + (inv.total || 0), 0)
  };

  // Calculate top products
  const productCounts = {};
  invoiceHistory.forEach(inv => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-como">Mi Dashboard</h1>
              <p className="text-gray-600 mt-1">
                {distributorInfo.name} {distributorInfo.last_name} • ID: {distributorInfo.code}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onViewChange('products')} className="px-4 py-2 bg-como text-white rounded-lg hover:bg-[#3d6849]">
                📦 Crear Factura
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BiMoney className="w-8 h-8" />
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-green-100 text-sm mb-1">Ventas Totales</p>
            <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            {stats.thisMonthRevenue > 0 && (
              <p className="text-green-100 text-xs mt-2">
                ${stats.thisMonthRevenue.toFixed(2)} este mes
              </p>
            )}
          </div>

          {/* Total Clients */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BiUser className="w-8 h-8" />
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-blue-100 text-sm mb-1">Clientes Únicos</p>
            <p className="text-3xl font-bold">{stats.uniqueClients}</p>
          </div>

          {/* Total Invoices */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BiTrendingUp className="w-8 h-8" />
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-purple-100 text-sm mb-1">Facturas Generadas</p>
            <p className="text-3xl font-bold">{stats.totalInvoices}</p>
            {stats.thisMonth > 0 && (
              <p className="text-purple-100 text-xs mt-2">
                {stats.thisMonth} este mes
              </p>
            )}
          </div>

          {/* Inventory Alert */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BiPackage className="w-8 h-8" />
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-orange-100 text-sm mb-1">Alertas de Stock</p>
            <p className="text-3xl font-bold">{lowStockProducts.length}</p>
            <p className="text-orange-100 text-xs mt-2">
              productos con poco stock
            </p>
          </div>
        </div>

        {/* Top Products & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-como mb-4">Top 5 Productos Más Vendidos</h2>
            {topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.map(([product, qty]) => (
                  <div key={product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-800">{product}</span>
                    <span className="bg-como text-white px-3 py-1 rounded-full font-bold">
                      {qty} unidades
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Aún no hay productos vendidos</p>
            )}
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-como mb-4 flex items-center gap-2">
              <BiBell className="text-orange-500" />
              Productos con Bajo Stock
            </h2>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map(([product, qty]) => (
                  <div key={product} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="font-semibold text-gray-800">{product}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                      {qty} unidades
                    </span>
                  </div>
                ))}
                <button 
                  onClick={() => onViewChange('inventory')}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
                >
                  Ver Inventario Completo →
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">✅</span>
                <p className="text-gray-600">Todo el inventario está actualizado</p>
                <button 
                  onClick={() => onViewChange('inventory')}
                  className="mt-4 text-como hover:underline font-semibold"
                >
                  Gestionar Inventario
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-como">Facturas Recientes</h2>
            <button 
              onClick={() => onViewChange('history')}
              className="text-como hover:underline font-semibold"
            >
              Ver Todo →
            </button>
          </div>
          {invoiceHistory.length > 0 ? (
            <div className="space-y-3">
              {invoiceHistory.slice(0, 5).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800">{inv.client}</p>
                    <p className="text-sm text-gray-600">{inv.date.toLocaleDateString('es-MX')}</p>
                  </div>
                  <p className="text-xl font-bold text-como">${inv.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aún no hay facturas generadas</p>
          )}
        </div>
      </div>
    </div>
  );
}

