"use client";

import React, { useState, useEffect } from 'react';
import { BiLock, BiTrendingUp, BiMoney, BiUser, BiPhone } from 'react-icons/bi';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [usaDistributors, setUsaDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalDistributors: 0,
    totalSales: 0,
    totalClients: 0,
    topSellers: []
  });

  const handleLogin = () => {
    if (adminCode === '220577') {
      setIsAuthenticated(true);
      loadUSADistributors();
    } else {
      alert('Código de admin incorrecto');
    }
  };

  const loadUSADistributors = async () => {
    try {
      if (!supabase) {
        alert('Supabase no disponible');
        return;
      }

      setLoading(true);

      // Cargar distribuidores de USA (phone con +1)
      const { data: distributors, error: distError } = await supabase
        .from('distributors')
        .select('*')
        .like('phone', '+1%');

      if (distError) throw distError;

      setUsaDistributors(distributors || []);

      // Calcular estadísticas por distribuidor
      const distributorStats = [];
      
      for (const dist of distributors || []) {
        // Cargar facturas del distribuidor
        const { data: invoices, error: invError } = await supabase
          .from('invoices')
          .select('*')
          .eq('distributor_code', dist.code);

        if (!invError && invoices) {
          const sales = invoices.reduce((sum, inv) => sum + parseFloat(inv.total_amount || 0), 0);
          const uniqueClients = new Set(invoices.map(inv => inv.client_number));
          
          distributorStats.push({
            ...dist,
            sales,
            invoiceCount: invoices.length,
            clientsCount: uniqueClients.size
          });
        }
      }

      // Calcular estadísticas generales
      const totalSales = distributorStats.reduce((sum, dist) => sum + dist.sales, 0);
      const totalClients = new Set();
      distributorStats.forEach(dist => {
        totalClients.add(dist.code);
      });

      // Ordenar por ventas
      distributorStats.sort((a, b) => b.sales - a.sales);

      setStats({
        totalDistributors: distributorStats.length,
        totalSales,
        totalClients: distributorStats.reduce((sum, dist) => sum + dist.clientsCount, 0),
        topSellers: distributorStats.slice(0, 5)
      });

      setUsaDistributors(distributorStats);
    } catch (error) {
      console.error('Error loading distributors:', error);
      alert('Error al cargar distribuidores');
    } finally {
      setLoading(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <BiLock className="w-16 h-16 text-como mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-como">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Panel de Administración MVV Natural</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Código de Administrador
              </label>
              <input
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Ingresa código"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-como"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all"
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-como">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Vista General - Distribuidores USA 🇺🇸</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <BiUser className="w-8 h-8" />
                  <span className="text-3xl">👥</span>
                </div>
                <p className="text-blue-100 text-sm mb-1">Total Distribuidores</p>
                <p className="text-4xl font-bold">{stats.totalDistributors}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <BiMoney className="w-8 h-8" />
                  <span className="text-3xl">💰</span>
                </div>
                <p className="text-green-100 text-sm mb-1">Ventas Totales</p>
                <p className="text-4xl font-bold">${stats.totalSales.toFixed(2)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <BiTrendingUp className="w-8 h-8" />
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-purple-100 text-sm mb-1">Total Clientes</p>
                <p className="text-4xl font-bold">{stats.totalClients}</p>
              </div>
            </div>

            {/* Distributors Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-como mb-4">Distribuidores USA</h2>

              {usaDistributors.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Código</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Nombre</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Ventas</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Facturas</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Clientes</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Teléfono</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usaDistributors.map((dist, index) => (
                        <tr key={dist.code} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 font-mono text-como font-bold">{dist.code}</td>
                          <td className="px-4 py-3 font-semibold">{dist.name} {dist.last_name}</td>
                          <td className="px-4 py-3">{dist.state}</td>
                          <td className="px-4 py-3 font-bold text-green-600">${dist.sales.toFixed(2)}</td>
                          <td className="px-4 py-3">{dist.invoiceCount}</td>
                          <td className="px-4 py-3">{dist.clientsCount}</td>
                          <td className="px-4 py-3">{dist.phone || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-12">No hay distribuidores de USA registrados</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

