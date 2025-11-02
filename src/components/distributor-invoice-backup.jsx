"use client";

import React, { useState, useEffect } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

import { PRODUCTS } from './product-catalog';

export function DistributorInvoiceSystem() {
  const [currentView, setCurrentView] = useState('login'); // login, register, products, invoice
  const [distributorId, setDistributorId] = useState('');
  const [distributorInfo, setDistributorInfo] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [clientData, setClientData] = useState({
    clientNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    productPrices: {},
    shippingPrice: 0
  });
  const [savedClients, setSavedClients] = useState({});

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedClientsStr = localStorage.getItem('savedClients');
        if (savedClientsStr) {
          const parsedClients = JSON.parse(savedClientsStr);
          setSavedClients(parsedClients);
        }
        
        const savedHistoryStr = localStorage.getItem('invoiceHistory');
        if (savedHistoryStr) {
          const parsedHistory = JSON.parse(savedHistoryStr);
          // Ensure dates are Date objects
          const historyWithDates = parsedHistory.map(inv => ({
            ...inv,
            date: new Date(inv.date)
          }));
          setInvoiceHistory(historyWithDates);
        }
        
        const lastDistributor = localStorage.getItem('lastLoggedIn');
        const savedDistributorsStr = localStorage.getItem('registeredDistributors');
        if (lastDistributor && savedDistributorsStr) {
          const distributors = JSON.parse(savedDistributorsStr);
          if (distributors[lastDistributor]) {
            setDistributorId(lastDistributor);
            setDistributorInfo(distributors[lastDistributor]);
            setCurrentView('products');
          }
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  }, []);

  const generateDistributorCode = () => {
    const saved = localStorage.getItem('registeredDistributors');
    const distributors = saved ? JSON.parse(saved) : {};
    const codes = Object.keys(distributors);
    let newCode;
    do {
      newCode = Math.floor(Math.random() * 900) + 100;
    } while (codes.includes(newCode.toString()));
    return newCode.toString();
  };

  const handleRegister = () => {
    try {
      const code = document.getElementById('registrationCode')?.value;
      if (code !== '3232') {
        alert('Código de registro incorrecto');
        return;
      }

      const name = document.getElementById('regName')?.value;
      const lastName = document.getElementById('regLastName')?.value;
      const state = document.getElementById('regState')?.value;

      if (!name || !lastName || !state) {
        alert('Completa los campos requeridos (Nombre, Apellido, Estado)');
        return;
      }

      const distributorCode = generateDistributorCode();
      const newDistributor = {
        code: distributorCode,
        name: name.trim(),
        lastName: lastName.trim(),
        state: state.trim(),
        phone: document.getElementById('regPhone')?.value || '',
        email: document.getElementById('regEmail')?.value || '',
        address: document.getElementById('regAddress')?.value || ''
      };

      const saved = localStorage.getItem('registeredDistributors');
      const distributors = saved ? JSON.parse(saved) : {};
      distributors[distributorCode] = newDistributor;
      localStorage.setItem('registeredDistributors', JSON.stringify(distributors));
      localStorage.setItem('lastLoggedIn', distributorCode);
      
      alert(`¡Registro exitoso! Tu código es: ${distributorCode}`);
      setDistributorId(distributorCode);
      setDistributorInfo(newDistributor);
      setCurrentView('products');
    } catch (error) {
      console.error('Error in registration:', error);
      alert('Error al registrar. Intenta nuevamente.');
    }
  };

  const handleLogin = () => {
    const saved = localStorage.getItem('registeredDistributors');
    if (!saved) {
      alert('No hay distribuidores registrados');
      return;
    }
    const distributors = JSON.parse(saved);
    if (distributors[distributorId]) {
      setDistributorInfo(distributors[distributorId]);
      setCurrentView('products');
      localStorage.setItem('lastLoggedIn', distributorId);
    } else {
      alert('Código no válido');
    }
  };

  const handleProductClick = (productName) => {
    setSelectedProducts({
      ...selectedProducts,
      [productName]: (selectedProducts[productName] || 0) + 1
    });
  };

  const updateQuantity = (productName, newQuantity) => {
    if (newQuantity <= 0) {
      const newSelected = { ...selectedProducts };
      delete newSelected[productName];
      setSelectedProducts(newSelected);
    } else {
      setSelectedProducts({ ...selectedProducts, [productName]: newQuantity });
    }
  };

  const handleStartInvoicing = () => {
    if (Object.keys(selectedProducts).length === 0) {
      alert('Selecciona al menos un producto');
      return;
    }
    setShowInvoiceForm(true);
  };

  const handleClientNumberChange = (e) => {
    const clientNum = e.target.value;
    setClientData({ ...clientData, clientNumber: clientNum });
    
    if (savedClients && savedClients[clientNum]) {
      const existingClient = savedClients[clientNum];
      setClientData({ 
        ...clientData, 
        clientNumber: clientNum,
        firstName: existingClient.firstName || '',
        lastName: existingClient.lastName || '',
        address: existingClient.address || '',
        city: existingClient.city || '',
        state: existingClient.state || '',
        zipCode: existingClient.zipCode || '',
        phone: existingClient.phone || '',
        email: existingClient.email || ''
      });
    }
  };

  const showInvoicePreview = () => {
    if (!clientData.firstName || !clientData.lastName || !clientData.address) {
      alert('Completa los campos requeridos');
      return;
    }

    const missingPrices = Object.keys(selectedProducts).filter(
      name => !clientData.productPrices[name]
    );

    if (missingPrices.length > 0) {
      alert(`Ingresa el precio para: ${missingPrices.join(', ')}`);
      return;
    }

    setCurrentInvoice({
      distributor: distributorInfo,
      client: clientData,
      products: selectedProducts,
      productPrices: clientData.productPrices,
      shipping: parseFloat(clientData.shippingPrice || 0),
      date: new Date()
    });
    setShowPreview(true);
  };

  const generateInvoiceFile = async () => {
    const invoiceHTML = createInvoiceHTML(currentInvoice);
    const html2canvas = (await import('html2canvas')).default;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = invoiceHTML;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '1200px';
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      width: 1200,
      height: tempDiv.scrollHeight,
      scale: 2
    });

    const link = document.createElement('a');
    link.download = `factura_${currentInvoice.client.firstName}_${currentInvoice.client.lastName}_${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();

    document.body.removeChild(tempDiv);
    
    // Save to history
    const newHistory = [...invoiceHistory, {
      id: Date.now(),
      date: currentInvoice.date,
      client: `${currentInvoice.client.firstName} ${currentInvoice.client.lastName}`,
      total: calculateTotal(currentInvoice),
      products: currentInvoice.products,
      data: currentInvoice
    }];
    
    setInvoiceHistory(newHistory);
    localStorage.setItem('invoiceHistory', JSON.stringify(newHistory));
    
    // Save client
    const clients = { ...savedClients };
    clients[clientData.clientNumber || `TEMP_${Date.now()}`] = {
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      address: clientData.address,
      city: clientData.city,
      state: clientData.state,
      zipCode: clientData.zipCode,
      phone: clientData.phone,
      email: clientData.email
    };
    setSavedClients(clients);
    localStorage.setItem('savedClients', JSON.stringify(clients));

    resetForm();
  };

  const calculateTotal = (invoiceData) => {
    let subtotal = 0;
    for (const productName in invoiceData.products) {
      const qty = invoiceData.products[productName];
      const price = parseFloat(invoiceData.productPrices[productName] || 0);
      subtotal += qty * price;
    }
    return subtotal + invoiceData.shipping;
  };

  const createInvoiceHTML = (invoiceData) => {
    const logoUrl = 'https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png';
    
    let subtotal = 0;
    for (const productName in invoiceData.products) {
      const qty = invoiceData.products[productName];
      const price = parseFloat(invoiceData.productPrices[productName] || 0);
      subtotal += qty * price;
    }
    const total = subtotal + invoiceData.shipping;

    let invoiceHTML = `
      <div style="font-family: Arial; padding: 40px; background: white; color: #333; max-width: 1200px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 3px solid #4A7C59; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <img src="${logoUrl}" style="height: 60px; margin-bottom: 10px;" />
            <h1 style="margin: 0; color: #4A7C59; font-size: 32px;">FACTURA</h1>
            <p style="margin: 5px 0; font-size: 14px;">MVV Natural Distributors</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${invoiceData.date.toLocaleDateString('es-MX')}</p>
            <p style="margin: 5px 0;"><strong>ID:</strong> ${invoiceData.distributor.code}</p>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="margin: 0 0 10px; color: #4A7C59;">Cliente</h3>
            <p style="margin: 5px 0;"><strong>${invoiceData.client.firstName} ${invoiceData.client.lastName}</strong></p>
            <p style="margin: 5px 0;">${invoiceData.client.address}</p>
            <p style="margin: 5px 0;">${invoiceData.client.city ? invoiceData.client.city + ', ' : ''}${invoiceData.client.state} ${invoiceData.client.zipCode}</p>
          </div>
          
          <div>
            <h3 style="margin: 0 0 10px; color: #4A7C59;">Distribuidor</h3>
            <p style="margin: 5px 0;"><strong>${invoiceData.distributor.name} ${invoiceData.distributor.lastName}</strong></p>
            <p style="margin: 5px 0;">${invoiceData.distributor.state}</p>
            <p style="margin: 5px 0;"><strong>ID:</strong> ${invoiceData.distributor.code}</p>
          </div>
        </div>
        
        <div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 20px 0;">
          <h3 style="margin: 0 0 20px; color: #4A7C59;">Productos</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Producto</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Cant</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Precio</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
    `;

    for (const productName in invoiceData.products) {
      const qty = invoiceData.products[productName];
      const price = parseFloat(invoiceData.productPrices[productName] || 0);
      const total = qty * price;
      const product = PRODUCTS.find(p => p.name === productName);

      invoiceHTML += `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 15px 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              ${product ? `<img src="${product.image}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 5px;" />` : ''}
              <span style="font-weight: 500;">${productName}</span>
            </div>
          </td>
          <td style="padding: 15px 10px; text-align: center;">${qty}</td>
          <td style="padding: 15px 10px; text-align: right;">$${price.toFixed(2)}</td>
          <td style="padding: 15px 10px; text-align: right; font-weight: bold;">$${total.toFixed(2)}</td>
        </tr>
      `;
    }

    invoiceHTML += `
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 30px; border-top: 2px solid #4A7C59; padding-top: 20px;">
          <div style="display: flex; justify-content: flex-end;">
            <div style="width: 300px;">
              <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px;">
                <span><strong>Subtotal:</strong></span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 16px;">
                <span><strong>Envío:</strong></span>
                <span>$${invoiceData.shipping.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 15px 0; padding: 15px; background: #4A7C59; color: white; border-radius: 5px;">
                <span style="font-size: 20px; font-weight: bold;">TOTAL:</span>
                <span style="font-size: 24px; font-weight: bold;">$${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return invoiceHTML;
  };

  const resetForm = () => {
    setSelectedProducts({});
    setShowInvoiceForm(false);
    setShowPreview(false);
    setClientData({
      clientNumber: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      productPrices: {},
      shippingPrice: 0
    });
  };

  const exportData = () => {
    if (!distributorInfo) {
      alert('Primero debes iniciar sesión');
      return;
    }

    try {
      const data = {
        distributor: distributorInfo,
        clients: savedClients,
        history: invoiceHistory,
        exportedDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `backup_${distributorInfo.code}_${Date.now()}.json`;
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error al exportar datos');
    }
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      try {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();
        const data = JSON.parse(text);

        // Import clients
        if (data.clients) {
          const existingClients = { ...savedClients };
          Object.assign(existingClients, data.clients);
          localStorage.setItem('savedClients', JSON.stringify(existingClients));
          setSavedClients(existingClients);
        }

        // Import history
        if (data.history) {
          const existingHistory = [...invoiceHistory];
          existingHistory.push(...data.history);
          localStorage.setItem('invoiceHistory', JSON.stringify(existingHistory));
          setInvoiceHistory(existingHistory);
        }

        // Import distributor info if available
        if (data.distributor) {
          const saved = localStorage.getItem('registeredDistributors');
          const distributors = saved ? JSON.parse(saved) : {};
          distributors[data.distributor.code] = data.distributor;
          localStorage.setItem('registeredDistributors', JSON.stringify(distributors));
        }

        alert('¡Datos importados exitosamente!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error al importar datos. Verifica el archivo JSON.');
      }
    };
    input.click();
  };

  // Calculate stats
  const stats = {
    totalInvoices: invoiceHistory.length,
    totalRevenue: invoiceHistory.reduce((sum, inv) => sum + inv.total, 0),
    uniqueClients: new Set(invoiceHistory.map(inv => inv.client)).size
  };

  // Login view
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-como mb-2">Sistema de Facturación</h1>
          <p className="text-center text-gray-600 mb-8">MVV Natural Distributors</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Código de Distribuidor</label>
              <input
                type="text"
                value={distributorId}
                onChange={(e) => setDistributorId(e.target.value)}
                placeholder="Ingresa tu código"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-como"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all"
            >
              Ingresar
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('register')}
              className="w-full border-2 border-como text-como hover:bg-como hover:text-white font-bold py-4 rounded-lg transition-all"
            >
              Registrarse como Distribuidor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Register view
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-como mb-2">Registro</h1>
          <p className="text-center text-gray-600 mb-8">Crea tu perfil</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Código de Registro *</label>
              <input id="registrationCode" type="password" placeholder="Ingresa código" className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre *</label>
                <input id="regName" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Apellido *</label>
                <input id="regLastName" className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Estado *</label>
              <input id="regState" placeholder="Ej: Texas..." className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Teléfono</label>
              <input id="regPhone" type="tel" className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input id="regEmail" type="email" className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Dirección</label>
              <input id="regAddress" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            
            <button
              onClick={handleRegister}
              className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg"
            >
              Registrar
            </button>

            <button
              onClick={() => setCurrentView('login')}
              className="w-full text-gray-600 hover:text-como py-2"
            >
              ← Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main products view
  if (currentView === 'products' && !showInvoiceForm) {
    const selectedCount = Object.keys(selectedProducts).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-como">Sistema de Facturación</h1>
                <p className="text-gray-600 mt-1">
                  {distributorInfo.name} {distributorInfo.lastName} • {distributorInfo.state} • ID: {distributorInfo.code}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentView('history')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  📋 Historial ({invoiceHistory.length})
                </button>
                <button onClick={exportData} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                  💾 Exportar
                </button>
                <button onClick={importData} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  📥 Importar
                </button>
              </div>
              <div className="bg-como text-white px-6 py-3 rounded-lg">
                <span className="text-2xl font-bold">{selectedCount}</span> seleccionados
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              💡 Haz clic en las imágenes para agregar productos. Usa +/- para ajustar cantidades.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {PRODUCTS.map((product, index) => {
              const quantity = selectedProducts[product.name] || 0;
              
              return (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div 
                    className="relative aspect-[5/6] cursor-pointer"
                    onClick={() => handleProductClick(product.name)}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {quantity > 0 && (
                      <div className="absolute inset-0 bg-como/20 flex items-center justify-center">
                        <div className="bg-como text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                          {quantity}
                        </div>
                      </div>
                    )}
                    
                    {quantity > 0 && (
                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 bg-white rounded-lg p-2 shadow-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.name, quantity - 1);
                          }}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          <BiMinus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-como flex-1 text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.name, quantity + 1);
                          }}
                          className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                        >
                          <BiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Start Invoicing Button */}
          <div className="sticky bottom-4 bg-white rounded-xl shadow-2xl p-4">
            <button
              onClick={handleStartInvoicing}
              disabled={selectedCount === 0}
              className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Comenzar Facturación ({selectedCount} productos)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // History view
  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-como">Historial de Facturas</h1>
              <button onClick={() => setCurrentView('products')} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                Volver
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {invoiceHistory.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600">No hay facturas generadas aún</p>
              </div>
            ) : (
              invoiceHistory.map((inv) => (
                <div key={inv.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-como">{inv.client}</h3>
                      <p className="text-gray-600 mt-1">{inv.date.toLocaleDateString('es-MX')}</p>
                      <p className="text-gray-600 mt-1">Total: ${inv.total.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentInvoice(inv.data);
                        setShowPreview(true);
                      }}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      👁️ Ver
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Invoice form or preview
  if (showInvoiceForm) {
    if (showPreview && currentInvoice) {
      // Preview view
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-como">Vista Previa de Factura</h1>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Editar
                </button>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div dangerouslySetInnerHTML={{ __html: createInvoiceHTML(currentInvoice) }} />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={generateInvoiceFile}
                className="flex-1 bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all"
              >
                📄 Generar Factura JPG
              </button>
              <button
                onClick={resetForm}
                className="px-6 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Invoice form view
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-como">Datos del Cliente</h1>
                <p className="text-gray-600 mt-1">Complete la información</p>
              </div>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Volver
              </button>
            </div>
          </div>

          {/* Client Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-como mb-4">Cliente</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Número Cliente</label>
                <input
                  type="text"
                  value={clientData.clientNumber}
                  onChange={handleClientNumberChange}
                  placeholder="Auto-completa si existe"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-como"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre *</label>
                <input
                  type="text"
                  value={clientData.firstName}
                  onChange={(e) => setClientData({ ...clientData, firstName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-como"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Apellido *</label>
                <input
                  type="text"
                  value={clientData.lastName}
                  onChange={(e) => setClientData({ ...clientData, lastName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Dirección *</label>
                <input
                  type="text"
                  value={clientData.address}
                  onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Ciudad</label>
                <input
                  type="text"
                  value={clientData.city}
                  onChange={(e) => setClientData({ ...clientData, city: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Estado</label>
                <input
                  type="text"
                  value={clientData.state}
                  onChange={(e) => setClientData({ ...clientData, state: e.target.value })}
                  placeholder="Ej: Texas..."
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">ZIP</label>
                <input
                  type="text"
                  value={clientData.zipCode}
                  onChange={(e) => setClientData({ ...clientData, zipCode: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={clientData.phone}
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Product Prices */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-como mb-4">Precios</h2>
            
            <div className="space-y-4">
              {Object.keys(selectedProducts).map((productName) => {
                const product = PRODUCTS.find(p => p.name === productName);
                const qty = selectedProducts[productName];
                
                return (
                  <div key={productName} className="flex items-center gap-4 p-4 border rounded-lg">
                    {product && <img src={product.image} alt={productName} className="w-16 h-16 object-contain rounded" />}
                    <div className="flex-1">
                      <h3 className="font-semibold">{productName}</h3>
                      <p className="text-sm text-gray-600">Cantidad: {qty}</p>
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        value={clientData.productPrices[productName] || ''}
                        onChange={(e) => setClientData({
                          ...clientData,
                          productPrices: { ...clientData.productPrices, [productName]: e.target.value }
                        })}
                        placeholder="Precio"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-como mb-4">Precio de Envío</h2>
            <input
              type="number"
              value={clientData.shippingPrice}
              onChange={(e) => setClientData({ ...clientData, shippingPrice: e.target.value })}
              placeholder="0.00"
              className="w-full px-4 py-3 border rounded-lg text-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={showInvoicePreview}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg"
            >
              👁️ Ver Vista Previa
            </button>
            <button
              onClick={resetForm}
              className="px-6 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
