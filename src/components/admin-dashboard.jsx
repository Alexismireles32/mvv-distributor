"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { BiLock, BiTrendingUp, BiMoney, BiUser, BiPhone } from 'react-icons/bi';
import { supabase } from '../lib/supabase';
import { AdminProductsManager } from './admin-products-manager';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [usaDistributors, setUsaDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [savingDistributor, setSavingDistributor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalDistributors: 0,
    totalSales: 0,
    totalClients: 0,
    topSellers: []
  });

  useEffect(() => {
    try {
      const flag = localStorage.getItem('admin_authed');
      if (flag === 'true') {
        setIsAuthenticated(true);
        loadUSADistributors();
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    if (adminCode === '0505') {
      try { localStorage.setItem('admin_authed', 'true'); } catch {}
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

  const openDistributor = async (dist) => {
    setSelectedDistributor(dist);
    setSelectedInvoices([]);
    if (!supabase) return;
    const { data } = await supabase
      .from('invoices')
      .select('*')
      .eq('distributor_code', dist.code)
      .order('invoice_date', { ascending: false });
    setSelectedInvoices(data || []);
  };

  const saveDistributor = async () => {
    try {
      if (!supabase || !selectedDistributor) return;
      setSavingDistributor(true);
      const update = { 
        name: selectedDistributor.name,
        last_name: selectedDistributor.last_name,
        state: selectedDistributor.state,
        phone: selectedDistributor.phone,
        email: selectedDistributor.email,
        pin: selectedDistributor.pin,
        is_active: selectedDistributor.is_active ?? true
      };
      await supabase.from('distributors').update(update).eq('code', selectedDistributor.code);
      alert('Cambios guardados');
    } catch (e) {
      alert('Error al guardar');
    } finally {
      setSavingDistributor(false);
    }
  };

  const toggleActive = () => {
    setSelectedDistributor((prev) => ({ ...prev, is_active: !(prev?.is_active ?? true) }));
  };

  const renderInvoiceHTML = (inv) => {
    const logoUrl = 'https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png';
    const data = inv.full_data || {};
    const client = data.client || { firstName: inv.client_name || '' };
    const distributor = data.distributor || { name: selectedDistributor?.name || '', last_name: selectedDistributor?.last_name || '', state: selectedDistributor?.state || '', code: selectedDistributor?.code || '' };
    const products = data.products || {};
    const productPrices = data.productPrices || {};
    let rows = '';
    let subtotal = 0;
    Object.keys(products).forEach((p) => {
      const qty = products[p];
      const price = parseFloat(productPrices[p] || 0);
      subtotal += qty * price;
      rows += `<tr><td style="padding:8px">${p}</td><td style="padding:8px;text-align:center">${qty}</td><td style="padding:8px;text-align:right">$${price.toFixed(2)}</td><td style=\"padding:8px;text-align:right\">$${(qty*price).toFixed(2)}</td></tr>`;
    });
    const total = subtotal + parseFloat(inv.shipping_price || 0);
    return `
      <div style="font-family: Arial, sans-serif; padding:16px; background:#FAF8F3; color:#1f2937;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #4A7C59;padding-bottom:8px;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:8px"><img src="${logoUrl}" style="height:32px"/><h3 style="margin:0;color:#376A4E">Orden de Compra</h3></div>
          <div style="font-size:12px;text-align:right">Fecha: ${new Date(inv.invoice_date).toLocaleDateString('es-MX')}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px">
          <div><h4 style="margin:0 0 4px;color:#376A4E;font-size:12px">Cliente</h4><div style="font-size:12px">${client.firstName || ''} ${client.lastName || ''}</div></div>
          <div><h4 style="margin:0 0 4px;color:#376A4E;font-size:12px">Distribuidor</h4><div style="font-size:12px"><strong>${distributor.name} ${distributor.last_name}</strong><br/>${distributor.state} • ID ${distributor.code}</div></div>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb">
          <thead><tr style="background:#EAF3ED;color:#2f5f46"><th style="padding:8px;text-align:left">Producto</th><th style="padding:8px;text-align:center">Cant</th><th style="padding:8px;text-align:right">Precio</th><th style="padding:8px;text-align:right">Total</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:10px;display:flex;justify-content:flex-end"><div style="width:220px">
          <div style="display:flex;justify-content:space-between;margin:6px 0"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
          <div style="display:flex;justify-content:space-between;margin:6px 0"><span>Envío:</span><span>$${parseFloat(inv.shipping_price||0).toFixed(2)}</span></div>
          <div style="display:flex;justify-content:space-between;margin:8px 0;padding:10px;background:#4A7C59;color:#fff;border-radius:6px"><strong>TOTAL:</strong><strong>$${total.toFixed(2)}</strong></div>
        </div></div>
      </div>`;
  };

  const downloadInvoiceJPG = async (inv) => {
    const html = renderInvoiceHTML(inv);
    const html2canvas = (await import('html2canvas')).default;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    temp.style.top = '-9999px';
    temp.style.width = '1200px';
    temp.style.backgroundColor = 'white';
    document.body.appendChild(temp);
    const canvas = await html2canvas(temp, { width: 1200, height: temp.scrollHeight, scale: 2, backgroundColor: '#ffffff' });
    const a = document.createElement('a');
    a.download = `factura_${inv.client_name || 'cliente'}_${inv.id}.jpg`;
    a.href = canvas.toDataURL('image/jpeg', 0.9);
    a.click();
    document.body.removeChild(temp);
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

  // Products manager view
  if (isAuthenticated && adminCode === '0505' && stats && (stats._currentView === 'products')) {
    return <AdminProductsManager onBack={() => setStats({ ...stats, _currentView: undefined })} />;
  }

  // Distributor detail view
  if (isAuthenticated && selectedDistributor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-como">Distribuidor #{selectedDistributor.code}</h1>
              <button onClick={() => setSelectedDistributor(null)} className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">← Volver</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editable info */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
              <h2 className="text-lg font-semibold mb-4">Información</h2>
              <div className="space-y-3">
                <input value={selectedDistributor.name || ''} onChange={(e)=>setSelectedDistributor({...selectedDistributor,name:e.target.value})} placeholder="Nombre" className="w-full px-3 py-2 border" />
                <input value={selectedDistributor.last_name || ''} onChange={(e)=>setSelectedDistributor({...selectedDistributor,last_name:e.target.value})} placeholder="Apellido" className="w-full px-3 py-2 border" />
                <input value={selectedDistributor.state || ''} onChange={(e)=>setSelectedDistributor({...selectedDistributor,state:e.target.value})} placeholder="Estado" className="w-full px-3 py-2 border" />
                <input value={selectedDistributor.phone || ''} onChange={(e)=>setSelectedDistributor({...selectedDistributor,phone:e.target.value})} placeholder="Teléfono" className="w-full px-3 py-2 border" />
                <input value={selectedDistributor.email || ''} onChange={(e)=>setSelectedDistributor({...selectedDistributor,email:e.target.value})} placeholder="Email" className="w-full px-3 py-2 border" />
                <div>
                  <label className="text-sm text-gray-600">PIN (4 dígitos)</label>
                  <input value={selectedDistributor.pin || ''} onChange={(e)=>setSelectedDistributor({...selectedDistributor,pin:e.target.value})} className="w-full px-3 py-2 border mt-1" />
                </div>
                <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={(selectedDistributor.is_active ?? true)} onChange={toggleActive} /> Activo</label>
                <div className="flex gap-2">
                  <button onClick={saveDistributor} disabled={savingDistributor} className="px-4 py-2 bg-como text-white hover:bg-[#3d6849]">{savingDistributor? 'Guardando...' : 'Guardar Cambios'}</button>
                  <a href="/productos" target="_blank" rel="noreferrer" className="px-4 py-2 border border-gray-300 text-gray-700">Abrir Productos</a>
                </div>
              </div>
            </div>

            {/* Invoices list */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Facturas</h2>
              {selectedInvoices.length === 0 ? (
                <p className="text-gray-500">Sin facturas registradas</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-3 py-2 text-left">Fecha</th>
                        <th className="px-3 py-2 text-left">Cliente</th>
                        <th className="px-3 py-2 text-left">Total</th>
                        <th className="px-3 py-2 text-left">Estado</th>
                        <th className="px-3 py-2 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoices.map((inv) => (
                        <tr key={inv.id} className="border-b">
                          <td className="px-3 py-2">{new Date(inv.invoice_date).toLocaleDateString('es-MX')}</td>
                          <td className="px-3 py-2">{inv.client_name}</td>
                          <td className="px-3 py-2">${parseFloat(inv.total_amount||0).toFixed(2)}</td>
                          <td className="px-3 py-2">{inv.confirmed ? 'Confirmada' : 'Pendiente'}</td>
                          <td className="px-3 py-2">
                            <button onClick={()=>downloadInvoiceJPG(inv)} className="px-3 py-1 bg-black text-white text-sm">Ver JPG</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
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
              onClick={() => {
                try { localStorage.removeItem('admin_authed'); } catch {}
                setIsAuthenticated(false);
              }}
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
                        <tr key={dist.code} className="border-b hover:bg-gray-50 cursor-pointer" onClick={()=>openDistributor(dist)}>
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
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStats({ ...stats, _currentView: 'products' })} className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg">Gestionar Productos</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

