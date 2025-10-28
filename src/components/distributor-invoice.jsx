"use client";

import React, { useState, useEffect } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { supabase } from '../lib/supabase';

// Product catalog
const PRODUCTS = [
  { name: "Duo-60 Fusion", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png", slug: "/duo-60-fusion" },
  { name: "Alpha Glow", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575532/alphaglow_jwu8mg.png", slug: "/alphaglow" },
  { name: "SOS Burn", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575596/sosburn_g2ui2b.png", slug: "/sosburn" },
  { name: "SOS Burn Clear", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575602/sosburnclear_iuyqej.png", slug: "/sosburn-clear" },
  { name: "SOS Burn Sensitive", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575600/sosburnsensitive_dfsrs1.png", slug: "/sosburn-sensitive" },
  { name: "Prime Rose", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575597/primerose_jk26zj.png", slug: "/primrose" },
  { name: "Lida Booster", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575576/Lidabooster_xd5mo9.png", slug: "/lidabooster" },
  { name: "Lipo HD 360", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575584/lipohd_zg9lxy.png", slug: "/lipohd" },
  { name: "Chupa Panza", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575545/chupapanza_m7zfgs.png", slug: "/chupapanza" },
  { name: "Higa2", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575578/higa2_bzokur.png", slug: "/higa2" },
  { name: "Serenity", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575589/serenity_mnncq7.png", slug: "/serenity" },
  { name: "Floryva", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575563/floryva_nb3b0y.png", slug: "/floryva" },
  { name: "Maca Premium", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575588/macapremium_s6k65z.png", slug: "/macapremium" },
  { name: "Encimax", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575578/encimax_kuhluy.png", slug: "/encimax" },
  { name: "Fat Blazer", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761578536/fatblazer_vw1fks.png", slug: "/fatblazer" },
  { name: "Slim Coffee", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575594/slimcoffe_taahyd.png", slug: "/slimcoffee" },
  { name: "Apple Cider Vinagre", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575550/applecyder_xxg1ps.png", slug: "/applecyder" },
  { name: "30-Day Detox", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575526/30daydetox_roziws.png", slug: "/30daydetox" },
  { name: "Colit 6", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575551/colit6_te7kpi.png", slug: "/colit6" },
  { name: "CM Push up Men", image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575544/cmpushup_ncxzh6.png", slug: "/cmpushupmen" }
];

export function DistributorInvoiceSystem() {
  const [currentView, setCurrentView] = useState('login');
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
  const [loading, setLoading] = useState(false);

  // Load from Supabase
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase client not available');
        return;
      }

      // Load from local storage as fallback
      const lastDistributor = localStorage.getItem('lastLoggedIn');
      if (lastDistributor) {
        // Try to load from Supabase
        const { data, error } = await supabase
          .from('distributors')
          .select('*')
          .eq('code', lastDistributor)
          .single();

        if (!error && data) {
          setDistributorId(lastDistributor);
          setDistributorInfo(data);
          setCurrentView('products');
          
          // Load clients
          await loadClients(data.code);
          
          // Load invoices
          await loadInvoices(data.code);
        }
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadClients = async (distCode) => {
    try {
      if (!supabase) return;
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('distributor_code', distCode);

      if (!error && data) {
        const clientsObj = {};
        data.forEach(client => {
          clientsObj[client.client_number] = {
            firstName: client.first_name,
            lastName: client.last_name,
            address: client.address,
            city: client.city || '',
            state: client.state || '',
            zipCode: client.zip_code || '',
            phone: client.phone || '',
            email: client.email || ''
          };
        });
        setSavedClients(clientsObj);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const loadInvoices = async (distCode) => {
    try {
      if (!supabase) return;
      
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('distributor_code', distCode)
        .order('invoice_date', { ascending: false });

      if (!error && data) {
        const history = data.map(inv => ({
          id: inv.id,
          date: new Date(inv.invoice_date),
          client: inv.client_name,
          total: parseFloat(inv.total_amount),
          products: inv.products,
          productPrices: inv.product_prices,
          shipping: parseFloat(inv.shipping_price),
          fullData: inv.full_data
        }));
        setInvoiceHistory(history);
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const generateDistributorCode = async () => {
    if (!supabase) {
      // Fallback if Supabase unavailable
      return Math.floor(Math.random() * 900) + 100 + '';
    }

    let newCode;
    do {
      newCode = Math.floor(Math.random() * 900) + 100;
      
      // Check if code exists in Supabase
      const { data } = await supabase
        .from('distributors')
        .select('code')
        .eq('code', newCode.toString())
        .single();
      
      if (!data) break;
    } while (true);
    
    return newCode.toString();
  };

  const handleRegister = async () => {
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

      setLoading(true);
      const distributorCode = await generateDistributorCode();
      const newDistributor = {
        code: distributorCode,
        name: name.trim(),
        last_name: lastName.trim(),
        state: state.trim(),
        phone: document.getElementById('regPhone')?.value || '',
        email: document.getElementById('regEmail')?.value || '',
        address: document.getElementById('regAddress')?.value || ''
      };

      // Insert into Supabase
      if (supabase) {
        const { error } = await supabase
          .from('distributors')
          .insert([newDistributor]);

        if (error) throw error;
      }

      localStorage.setItem('lastLoggedIn', distributorCode);
      
      alert(`¡Registro exitoso! Tu código es: ${distributorCode}`);
      setDistributorId(distributorCode);
      setDistributorInfo(newDistributor);
      setCurrentView('products');
      setLoading(false);
    } catch (error) {
      console.error('Error in registration:', error);
      alert('Error al registrar. Intenta nuevamente.');
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      if (!supabase) {
        alert('Sistema no disponible. Verifica la conexión.');
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('distributors')
        .select('*')
        .eq('code', distributorId)
        .single();

      if (error || !data) {
        alert('Código no válido');
        setLoading(false);
        return;
      }

      setDistributorInfo(data);
      setCurrentView('products');
      localStorage.setItem('lastLoggedIn', distributorId);
      
      // Load clients and invoices
      await loadClients(data.code);
      await loadInvoices(data.code);
      
      setLoading(false);
    } catch (error) {
      console.error('Error in login:', error);
      alert('Error al iniciar sesión');
      setLoading(false);
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

  const handleClientNumberChange = async (e) => {
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

    // Wait for images to load before capturing
    const images = tempDiv.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    }));

    const canvas = await html2canvas(tempDiv, {
      width: 1200,
      height: tempDiv.scrollHeight,
      scale: 2,
      useCORS: true, // Allow cross-origin images
      allowTaint: true, // Allow images from other domains
      logging: false // Disable console logs
    });

    const link = document.createElement('a');
    link.download = `factura_${currentInvoice.client.firstName}_${currentInvoice.client.lastName}_${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();

    document.body.removeChild(tempDiv);
    
    // Save to Supabase
    try {
      const { error: clientError } = await supabase
        .from('clients')
        .upsert({
          client_number: currentInvoice.client.clientNumber || `TEMP_${Date.now()}`,
          distributor_code: currentInvoice.distributor.code,
          first_name: currentInvoice.client.firstName,
          last_name: currentInvoice.client.lastName,
          address: currentInvoice.client.address,
          city: currentInvoice.client.city,
          state: currentInvoice.client.state,
          zip_code: currentInvoice.client.zipCode,
          phone: currentInvoice.client.phone,
          email: currentInvoice.client.email
        });

      if (clientError) console.error('Error saving client:', clientError);

      // Save invoice
      const total = calculateTotal(currentInvoice);
      const { data, error: invError } = await supabase
        .from('invoices')
        .insert({
          distributor_code: currentInvoice.distributor.code,
          client_number: currentInvoice.client.clientNumber || `TEMP_${Date.now()}`,
          client_name: `${currentInvoice.client.firstName} ${currentInvoice.client.lastName}`,
          invoice_date: currentInvoice.date.toISOString(),
          total_amount: total,
          products: currentInvoice.products,
          product_prices: currentInvoice.productPrices,
          shipping_price: currentInvoice.shipping,
          full_data: currentInvoice
        })
        .select()
        .single();

      if (!invError && data) {
        setInvoiceHistory([{
          id: data.id,
          date: new Date(data.invoice_date),
          client: data.client_name,
          total: parseFloat(data.total_amount),
          products: data.products,
          productPrices: data.product_prices,
          shipping: parseFloat(data.shipping_price),
          fullData: data.full_data
        }, ...invoiceHistory]);
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }

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
            <p style="margin: 5px 0;"><strong>${invoiceData.distributor.name} ${invoiceData.distributor.last_name}</strong></p>
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
        
        <!-- Legal Disclaimer -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="font-size: 9px; color: #666; line-height: 1.4; text-align: center; margin: 0;">
            Comprobante de venta oficial MVV Natural emitido por distribuidor autorizado. 
            Los productos son naturales. El uso correcto es responsabilidad del cliente. 
            Por ser agente de conexión, el distribuidor actúa en representación de la compañía.
          </p>
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
                disabled={loading}
              />
            </div>
            
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Ingresar'}
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
              disabled={loading}
              className="w-full bg-como hover:bg-[#3d6849] text-white font-bold py-4 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrar'}
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
                  {distributorInfo.name} {distributorInfo.last_name} • {distributorInfo.state} • ID: {distributorInfo.code}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentView('history')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  📋 Historial ({invoiceHistory.length})
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
                        setCurrentInvoice(inv.fullData || inv);
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

  // Preview view (can be shown from history or after form)
  if (showPreview && currentInvoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-como">Vista Previa de Factura</h1>
              <button
                onClick={() => {
                  if (showInvoiceForm) {
                    setShowPreview(false);
                  } else {
                    setShowPreview(false);
                    setCurrentView('history');
                  }
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Volver
              </button>
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div dangerouslySetInnerHTML={{ __html: createInvoiceHTML(currentInvoice) }} />
          </div>

          {/* Actions - Only show if coming from form, not from history */}
          {showInvoiceForm && (
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
          )}
        </div>
      </div>
    );
  }

  // Invoice form view (only when not showing preview)
  if (showInvoiceForm && !showPreview) {
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
