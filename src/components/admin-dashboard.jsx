"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { BiLock, BiTrendingUp, BiMoney, BiUser, BiPhone } from 'react-icons/bi';
import { api } from '../lib/api';
import { escapeHtml } from '../lib/escape-html';
import { AdminProductsManager } from './admin-products-manager';

// Reserved code for the admin account row in the distributors table.
const ADMIN_DISTRIBUTOR_CODE = '999';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'products' | 'detail'
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

  // Ask the server whether this browser holds an admin session. The old version
  // trusted `localStorage.admin_authed === 'true'`, which anyone could set from the
  // console to unlock the whole dashboard.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { role } = await api.session();
        if (!cancelled && role === 'admin') {
          setIsAuthenticated(true);
          loadUSADistributors();
        }
      } catch {
        // Not signed in — stay on the login screen.
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      // Admins sign in through the normal login endpoint; the server decides whether
      // the account carries the admin role.
      const { role } = await api.login(ADMIN_DISTRIBUTOR_CODE, adminCode);
      if (role !== 'admin') {
        alert('Esta cuenta no tiene permisos de administrador');
        return;
      }
      setIsAuthenticated(true);
      await loadUSADistributors();
    } catch (error) {
      alert(error.message || 'Código de admin incorrecto');
    } finally {
      setLoading(false);
    }
  };

  const loadUSADistributors = async () => {
    try {
      setLoading(true);
      const { distributors, stats: serverStats } = await api.adminDistributors();
      setUsaDistributors(distributors);
      setStats(serverStats);
    } catch (error) {
      console.error('Error loading distributors:', error);
      alert(error.message || 'Error al cargar distribuidores');
    } finally {
      setLoading(false);
    }
  };

  const openDistributor = async (dist) => {
    setSelectedDistributor(dist);
    setSelectedInvoices([]);
    try {
      const { invoices } = await api.adminInvoices(dist.code);
      setSelectedInvoices(invoices || []);
    } catch (error) {
      console.error('Error loading invoices:', error);
      alert(error.message || 'Error al cargar facturas');
    }
  };

  const saveDistributor = async () => {
    try {
      if (!selectedDistributor) return;
      setSavingDistributor(true);

      // `pin` is only sent when the admin actually typed a new one; the server hashes
      // it. Sending an empty string would otherwise overwrite a working PIN.
      const payload = {
        code: selectedDistributor.code,
        name: selectedDistributor.name,
        last_name: selectedDistributor.last_name,
        state: selectedDistributor.state,
        phone: selectedDistributor.phone,
        email: selectedDistributor.email,
        is_active: selectedDistributor.is_active ?? true
      };
      if (selectedDistributor.pin) payload.pin = selectedDistributor.pin;

      await api.adminUpdateDistributor(payload);
      alert('Cambios guardados');
    } catch (error) {
      alert(error.message || 'Error al guardar');
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
      rows += `<tr><td style="padding:8px">${escapeHtml(p)}</td><td style="padding:8px;text-align:center">${escapeHtml(qty)}</td><td style="padding:8px;text-align:right">$${price.toFixed(2)}</td><td style=\"padding:8px;text-align:right\">$${(qty*price).toFixed(2)}</td></tr>`;
    });
    const total = subtotal + parseFloat(inv.shipping_price || 0);
    return `
      <div style="font-family: Arial, sans-serif; padding:16px; background:#FAF8F3; color:#1f2937;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #4A7C59;padding-bottom:8px;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:8px"><img src="${logoUrl}" style="height:32px"/><h3 style="margin:0;color:#376A4E">Orden de Compra</h3></div>
          <div style="font-size:12px;text-align:right">Fecha: ${new Date(inv.invoice_date).toLocaleDateString('es-MX')}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px">
          <div><h4 style="margin:0 0 4px;color:#376A4E;font-size:12px">Cliente</h4><div style="font-size:12px">${escapeHtml(client.firstName)} ${escapeHtml(client.lastName)}</div></div>
          <div><h4 style="margin:0 0 4px;color:#376A4E;font-size:12px">Distribuidor</h4><div style="font-size:12px"><strong>${escapeHtml(distributor.name)} ${escapeHtml(distributor.last_name)}</strong><br/>${escapeHtml(distributor.state)} • ID ${escapeHtml(distributor.code)}</div></div>
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
  if (isAuthenticated && view === 'products') {
    return <AdminProductsManager onBack={() => setView('dashboard')} />;
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
                <button onClick={() => setView('products')} className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg">Gestionar Productos</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

