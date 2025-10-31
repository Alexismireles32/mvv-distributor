"use client";

import React, { useState, useEffect } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { supabase } from '../lib/supabase';
import { DistributorDashboard } from './distributor-dashboard';
import { InventoryManager } from './inventory-manager';
import { PriceManager } from './price-manager';
import { ContactManager } from './contact-manager';
import { PDFExporter } from './pdf-exporter';
import { AdminDashboard } from './admin-dashboard';
import { PaymentMethodsManager } from './payment-methods-manager';
import { ProfileManager } from './profile-manager';

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
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  
  // New states for new features
  const [inventory, setInventory] = useState({});
  const [defaultPrices, setDefaultPrices] = useState({});
  const [reminderSettings, setReminderSettings] = useState({
    days: ['30']
  });
  
  // PIN state for login
  const [pin, setPin] = useState('');

  // Load from Supabase
  useEffect(() => {
    loadInitialData();
  }, []);

  const handleLogout = () => {
    // Clear all session data
    setDistributorId('');
    setDistributorInfo(null);
    setSelectedProducts({});
    setInvoiceHistory([]);
    setSavedClients({});
    setInventory({});
    setDefaultPrices({});
    setCurrentInvoice(null);
    setShowInvoiceForm(false);
    setShowPreview(false);
    setPin('');
    
    // Clear localStorage to force new login
    localStorage.removeItem('lastLoggedIn');
    localStorage.removeItem('admin_authed');
    
    // Return to login view
    setCurrentView('login');
  };

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
          setCurrentView('dashboard');
          
          // Load clients
          await loadClients(data.code);
          
          // Load invoices
          await loadInvoices(data.code);
          
          // Load default prices
          await loadDefaultPrices(data.code);
          
          // Load inventory
          await loadInventory(data.code);
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
        const history = data.map(inv => {
          const parsedDate = inv.invoice_date ? new Date(inv.invoice_date) : new Date();
          let fullData = inv.full_data ? { ...inv.full_data } : null;

          if (fullData) {
            if (fullData.date && !(fullData.date instanceof Date)) {
              fullData.date = new Date(fullData.date);
            }
            if (fullData.confirmedAt && !(fullData.confirmedAt instanceof Date)) {
              fullData.confirmedAt = new Date(fullData.confirmedAt);
            }
            if (fullData.client && fullData.client.lastPurchaseDate && !(fullData.client.lastPurchaseDate instanceof Date)) {
              fullData.client.lastPurchaseDate = new Date(fullData.client.lastPurchaseDate);
            }
          }

          return {
            id: inv.id,
            date: parsedDate,
            client: inv.client_name,
            total: parseFloat(inv.total_amount) || 0,
            products: inv.products || {},
            productPrices: inv.product_prices || {},
            shipping: parseFloat(inv.shipping_price) || 0,
            fullData,
            confirmed: Boolean(inv.confirmed),
            confirmedAt: inv.confirmed_at ? new Date(inv.confirmed_at) : null
          };
        });
        setInvoiceHistory(history);
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  // Load default prices
  const loadDefaultPrices = async (distributorCode) => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('distributor_prices')
        .select('*')
        .eq('distributor_code', distributorCode);

      if (!error && data) {
        const pricesObj = {};
        data.forEach(item => {
          pricesObj[item.product_name] = parseFloat(item.price) || 0;
        });
        setDefaultPrices(pricesObj);
      }
    } catch (error) {
      console.error('Error loading default prices:', error);
    }
  };

  // Load inventory
  const loadInventory = async (distributorCode) => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('distributor_code', distributorCode);

      if (!error && data) {
        const invObj = {};
        data.forEach(item => {
          invObj[item.product_name] = item.stock_quantity || 0;
        });
        setInventory(invObj);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  // Confirm sale and update inventory
  const confirmSale = async (invoiceId) => {
    try {
      if (!supabase) return;

      // Update invoice as confirmed
      const { data, error } = await supabase
        .from('invoices')
        .update({
          confirmed: true,
          confirmed_at: new Date().toISOString()
        })
        .eq('id', invoiceId)
        .select()
        .single();

      if (!error && data) {
        // Update local state
        setInvoiceHistory(prev => 
          prev.map(inv => 
            inv.id === invoiceId 
              ? { ...inv, confirmed: true, confirmedAt: new Date() }
              : inv
          )
        );

        // Now update inventory since sale is confirmed
        await updateInventoryAfterSale(data.distributor_code, data.products);
        
        alert('✅ Venta confirmada e inventario actualizado');
      }
    } catch (error) {
      console.error('Error confirming sale:', error);
      alert('Error al confirmar la venta');
    }
  };

  // Cancel/unconfirm sale
  const cancelSale = async (invoiceId) => {
    try {
      if (!supabase) return;

      const confirmed = window.confirm('¿Estás seguro de que quieres cancelar esta venta?');
      if (!confirmed) return;

      // Delete the invoice
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId);

      if (!error) {
        // Remove from local state
        setInvoiceHistory(prev => prev.filter(inv => inv.id !== invoiceId));
        alert('✅ Venta cancelada');
      }
    } catch (error) {
      console.error('Error canceling sale:', error);
      alert('Error al cancelar la venta');
    }
  };

  // Update inventory after sale
  const updateInventoryAfterSale = async (distributorCode, soldProducts) => {
    try {
      if (!supabase) return;

      // Update each product's inventory
      const promises = Object.entries(soldProducts).map(([productName, soldQty]) => {
        const currentStock = inventory[productName] || 0;
        const newStock = Math.max(0, currentStock - soldQty);
        
        return supabase
          .from('inventory')
          .upsert({
            distributor_code: distributorCode,
            product_name: productName,
            stock_quantity: newStock,
            updated_at: new Date().toISOString()
          });
      });

      await Promise.all(promises);
      await loadInventory(distributorCode);
      
    } catch (error) {
      console.error('Error updating inventory after sale:', error);
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
      const country = document.getElementById('regCountry')?.value || '';

      if (!name || !lastName || !state) {
        alert('Completa los campos requeridos (Nombre, Apellido, Estado)');
        return;
      }

      setLoading(true);
      const distributorCode = await generateDistributorCode();
      
      // Concatenar lada + número de teléfono
      const phoneLada = document.getElementById('regPhoneLada')?.value || '';
      const phoneNumber = document.getElementById('regPhone')?.value || '';
      const fullPhone = phoneLada && phoneNumber ? `${phoneLada}${phoneNumber}` : '';
      
      // Get PIN from form
      const pin = document.getElementById('regPin')?.value || '';
      if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
        alert('El PIN debe ser de 4 dígitos numéricos');
        setLoading(false);
        return;
      }
      
      const newDistributor = {
        code: distributorCode,
        name: name.trim(),
        last_name: lastName.trim(),
        state: state.trim(),
        country: country.trim(),
        phone: fullPhone,
        email: document.getElementById('regEmail')?.value || '',
        pin: pin.trim()
      };

      // Insert into Supabase
      if (supabase) {
        const { error } = await supabase
          .from('distributors')
          .insert([newDistributor]);

        if (error) throw error;
      }

      localStorage.setItem('lastLoggedIn', distributorCode);
      
      alert(`¡Registro exitoso! Tu código es: ${distributorCode}. Guarda tu PIN: ${pin}`);
      setDistributorId(distributorCode);
      setDistributorInfo(newDistributor);
      setCurrentView('dashboard');
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

      // Admin login: code 999 + PIN 0505
      if (distributorId === '999' && pin === '0505') {
        try {
          localStorage.setItem('admin_authed', 'true');
        } catch {}
        setCurrentView('admin');
        setPin('');
        return;
      }

      // Validate PIN for regular distributors
      if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
        alert('PIN inválido. Debe ser de 4 dígitos numéricos');
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
        setPin(''); // Clear PIN on error
        return;
      }

      // Verify PIN
      if (data.pin !== pin) {
        alert('PIN incorrecto');
        setLoading(false);
        setPin(''); // Clear PIN on error
        return;
      }

      setDistributorInfo(data);
      setCurrentView('dashboard');
      localStorage.setItem('lastLoggedIn', distributorId);
      
      // Load clients and invoices
      await loadClients(data.code);
      await loadInvoices(data.code);
      
      // Load default prices
      await loadDefaultPrices(data.code);
      
      // Load inventory
      await loadInventory(data.code);
      
      setLoading(false);
    } catch (error) {
      console.error('Error in login:', error);
      alert('Error al iniciar sesión');
      setLoading(false);
    }
  };

  const handleProductClick = (productName) => {
    try {
      setSelectedProducts({
        ...selectedProducts,
        [productName]: (selectedProducts[productName] || 0) + 1
      });
      
      // Auto-fill price from default prices if not already set
      if (!clientData.productPrices[productName] && defaultPrices[productName]) {
        setClientData(prevData => ({
          ...prevData,
          productPrices: { ...prevData.productPrices, [productName]: defaultPrices[productName] }
        }));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar producto. Intenta nuevamente.');
    }
  };

  const updateQuantity = (productName, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        const newSelected = { ...selectedProducts };
        delete newSelected[productName];
        setSelectedProducts(newSelected);
        
        // Remove price when removing product
        setClientData(prevData => ({
          ...prevData,
          productPrices: { ...prevData.productPrices, [productName]: '' }
        }));
      } else {
        setSelectedProducts({ ...selectedProducts, [productName]: newQuantity });
        
        // Auto-fill price from default prices if not already set
        if (!clientData.productPrices[productName] && defaultPrices[productName]) {
          setClientData(prevData => ({
            ...prevData,
            productPrices: { ...prevData.productPrices, [productName]: defaultPrices[productName] }
          }));
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error al actualizar cantidad. Intenta nuevamente.');
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
    if (!currentInvoice) return;

    const invoiceData = {
      ...currentInvoice,
      distributor: currentInvoice.distributor || distributorInfo,
      client: { ...(currentInvoice.client || {}) },
      date: currentInvoice.date instanceof Date ? currentInvoice.date : new Date(currentInvoice.date)
    };

    if (!invoiceData.distributor || !invoiceData.distributor.code) {
      alert('Información del distribuidor no disponible para generar la factura.');
      return;
    }

    const isExistingInvoice = Boolean(invoiceData.invoiceId);
    let tempDiv;

    try {
      setGeneratingInvoice(true);

      const invoiceHTML = createInvoiceHTML(invoiceData);
      const html2canvas = (await import('html2canvas')).default;

      tempDiv = document.createElement('div');
      tempDiv.innerHTML = invoiceHTML;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '540px';
      tempDiv.style.maxWidth = '540px';
      tempDiv.style.overflow = 'hidden';
      tempDiv.style.boxSizing = 'border-box';
      tempDiv.style.backgroundColor = '#FAF8F3';
      document.body.appendChild(tempDiv);

      const images = tempDiv.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Wait a moment for layout to stabilize
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(tempDiv, {
        width: 540,
        height: tempDiv.scrollHeight,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#FAF8F3',
        windowWidth: 540,
        windowHeight: tempDiv.scrollHeight
      });

      const link = document.createElement('a');
      const safeFirstName = invoiceData.client.firstName || 'cliente';
      const safeLastName = invoiceData.client.lastName || 'mvv';
      const timestamp = invoiceData.invoiceId || Date.now();
      link.download = `factura_${safeFirstName}_${safeLastName}_${timestamp}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();

      if (!isExistingInvoice && supabase) {
        try {
          await supabase
            .from('clients')
            .upsert({
              client_number: invoiceData.client.clientNumber || `TEMP_${Date.now()}`,
              distributor_code: invoiceData.distributor.code,
              first_name: invoiceData.client.firstName,
              last_name: invoiceData.client.lastName,
              address: invoiceData.client.address,
              city: invoiceData.client.city,
              state: invoiceData.client.state,
              zip_code: invoiceData.client.zipCode,
              phone: invoiceData.client.phone,
              email: invoiceData.client.email
            });

          const total = calculateTotal(invoiceData);
          const { data, error: invError } = await supabase
            .from('invoices')
            .insert({
              distributor_code: invoiceData.distributor.code,
              client_number: invoiceData.client.clientNumber || `TEMP_${Date.now()}`,
              client_name: `${invoiceData.client.firstName || ''} ${invoiceData.client.lastName || ''}`.trim(),
              invoice_date: invoiceData.date.toISOString(),
              total_amount: total,
              products: invoiceData.products,
              product_prices: invoiceData.productPrices,
              shipping_price: invoiceData.shipping,
              full_data: invoiceData,
              confirmed: false,
              confirmed_at: null
            })
            .select()
            .single();

          if (!invError && data) {
            const insertedFullData = data.full_data ? { ...data.full_data } : null;
            if (insertedFullData && insertedFullData.date && !(insertedFullData.date instanceof Date)) {
              insertedFullData.date = new Date(insertedFullData.date);
            }
            setInvoiceHistory(prev => [{
              id: data.id,
              date: new Date(data.invoice_date),
              client: data.client_name,
              total: parseFloat(data.total_amount) || 0,
              products: data.products || {},
              productPrices: data.product_prices || {},
              shipping: parseFloat(data.shipping_price) || 0,
              fullData: insertedFullData,
              confirmed: false,
              confirmedAt: null
            }, ...prev]);
          }
        } catch (dbError) {
          console.error('Error saving to Supabase:', dbError);
        }

        resetForm();
      }
    } catch (error) {
      console.error('Error generating invoice file:', error);
      alert('Error al generar la factura. Intenta nuevamente.');
    } finally {
      if (tempDiv && document.body.contains(tempDiv)) {
        document.body.removeChild(tempDiv);
      }
      setGeneratingInvoice(false);
    }
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
      <div class="inv-container" style="font-family: Arial, sans-serif; padding: 18px; background: #FAF8F3; color: #1f2937; width: 540px; max-width: 540px; margin: 0 auto; box-sizing: border-box; overflow: hidden;">
        <style>
          * { box-sizing: border-box; }
          .inv-header{display:flex;flex-direction:column;align-items:center;gap:8px;border-bottom:2px solid #4A7C59;padding-bottom:12px;margin-bottom:14px}
          .inv-brand{display:flex;align-items:center;gap:8px}
          .inv-brand img{height:34px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.06)); flex-shrink:0}
          .inv-title{margin:0;color:#376A4E;font-size:18px;text-align:center;font-weight:600}
          .inv-sub{margin:0;font-size:11px;color:#4b5563;text-align:center}
          .inv-meta{font-size:11px;color:#374151;text-align:center}
          .inv-info{display:flex;flex-direction:column;gap:10px;margin-bottom:12px}
          .inv-info > div{background:#fff;padding:10px;border-radius:6px;border:1px solid #e5e7eb}
          .inv-info h3{margin:0 0 5px;color:#376A4E;font-size:13px;text-transform:uppercase;font-weight:600}
          .inv-info p{margin:2px 0;font-size:13px;word-wrap:break-word;overflow-wrap:break-word}
          .inv-table{width:100%;max-width:100%;border-collapse:collapse;background:#FFFFFF;border:1px solid #e5e7eb;font-size:11px;table-layout:fixed}
          .inv-table th{padding:6px 4px;text-align:left;border-bottom:1px solid #e5e7eb;background:#EAF3ED;font-size:11px;color:#2f5f46;font-weight:600;overflow:hidden;text-overflow:ellipsis}
          .inv-table td{padding:6px 4px;border-bottom:1px solid #f1f5f9;font-size:11px;word-break:break-word;overflow:hidden;text-overflow:ellipsis}
          .inv-table th:nth-child(1),.inv-table td:nth-child(1){width:45%}
          .inv-table th:nth-child(2),.inv-table td:nth-child(2){width:15%;text-align:center}
          .inv-table th:nth-child(3),.inv-table td:nth-child(3){width:20%;text-align:right}
          .inv-table th:nth-child(4),.inv-table td:nth-child(4){width:20%;text-align:right}
          .inv-totals{margin-top:12px;border-top:2px solid #4A7C59;padding-top:10px;background:#fff;padding:10px;border-radius:6px;border:1px solid #e5e7eb}
          .inv-totals .row{display:flex;justify-content:space-between;margin:5px 0;font-size:13px}
          .inv-totals .total{display:flex;justify-content:space-between;margin:6px 0;padding:10px;background:#4A7C59;color:#fff;border-radius:6px;font-size:17px;font-weight:600}
          .inv-legal{margin-top:8px;padding-top:10px;border-top:1px solid #e5e7eb}
          .inv-legal p{font-size:10px;color:#4b5563;line-height:1.4;text-align:center;margin:0;word-wrap:break-word}
        </style>

        <div class="inv-header">
          <div class="inv-brand">
            <img src="${logoUrl}" alt="MVV Natural" />
            <div>
              <h1 class="inv-title">Orden de Compra</h1>
              <p class="inv-sub">MVV Natural Distributors</p>
            </div>
          </div>
          <div class="inv-meta">
            <div><strong>Fecha:</strong> ${invoiceData.date.toLocaleDateString('es-MX')}</div>
            <div><strong>ID:</strong> ${invoiceData.distributor.code}</div>
          </div>
        </div>

        <div class="inv-info">
          <div>
            <h3>Cliente</h3>
            <p><strong>${invoiceData.client.firstName} ${invoiceData.client.lastName}</strong></p>
            <p>${invoiceData.client.address || ''}</p>
            <p>${invoiceData.client.city ? invoiceData.client.city + ', ' : ''}${invoiceData.client.state || ''} ${invoiceData.client.zipCode || ''}</p>
          </div>
          <div>
            <h3>Distribuidor</h3>
            <p><strong>${invoiceData.distributor.name} ${invoiceData.distributor.last_name}</strong></p>
            <p>${invoiceData.distributor.state || ''}</p>
            <p><strong>ID:</strong> ${invoiceData.distributor.code}</p>
          </div>
        </div>
        
        <div style="margin: 12px 0;">
          <h3 style="margin: 0 0 10px; color: #4A7C59; font-size:14px; font-weight:600">Productos</h3>
          <table class="inv-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align:center">Cant</th>
                <th style="text-align:right">Precio</th>
                <th style="text-align:right">Total</th>
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
          <td style="padding: 6px 4px; font-size: 11px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              ${product ? `<img src="${product.image}" style="width: 32px; height: 32px; object-fit: contain; border-radius: 3px; flex-shrink:0;" />` : ''}
              <span style="font-weight: 500; word-break: break-word; overflow: hidden; text-overflow: ellipsis;">${productName}</span>
            </div>
          </td>
          <td style="padding: 6px 4px; text-align: center; font-size: 11px;">${qty}</td>
          <td style="padding: 6px 4px; text-align: right; font-size: 11px;">$${price.toFixed(2)}</td>
          <td style="padding: 6px 4px; text-align: right; font-weight: 600; font-size: 11px;">$${total.toFixed(2)}</td>
        </tr>
      `;
    }

    invoiceHTML += `
            </tbody>
          </table>
        </div>
        
        <div class="inv-totals">
          <div class="row"><span><strong>Subtotal:</strong></span><span>$${subtotal.toFixed(2)}</span></div>
          <div class="row"><span><strong>Envío:</strong></span><span>$${invoiceData.shipping.toFixed(2)}</span></div>
          <div class="total"><span><strong>TOTAL:</strong></span><span><strong>$${total.toFixed(2)}</strong></span></div>
        </div>
        
        <!-- Legal Disclaimer -->
        <div class="inv-legal">
          <p>
            Comprobante de venta oficial MVV Natural emitido por distribuidor autorizado. 
            Los productos son naturales. El uso correcto es responsabilidad del cliente. 
            Por ser agente de conexión, el distribuidor actúa en representación de la compañía.
          </p>
        </div>
        <div style="text-align: center; padding-top: 14px; border-top: 1px solid #e5e7eb; margin-top: 8px;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">MVV Natural - Suplementos 100% Naturales</p>
          <p style="font-size: 12px; color: #6b7280; margin: 4px 0 0 0;">www.mvvnaturales.org</p>
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

  // Preview view (MUST BE FIRST - can be shown from anywhere)
  if (showPreview && currentInvoice) {
    // Get confirmation status from currentInvoice (added when viewing from history)
    const isConfirmed = currentInvoice.confirmed || false;
    const confirmedAt = currentInvoice.confirmedAt ? new Date(currentInvoice.confirmedAt) : null;

    return (
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900">Factura</h1>
              <div className="flex items-center gap-3 mt-2">
                {isConfirmed ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✅ Venta Confirmada
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    ⏳ Pendiente de Confirmación
                  </span>
                )}
                {confirmedAt && (
                  <span className="text-sm text-gray-500">
                    Confirmada el {confirmedAt.toLocaleDateString('es-MX')}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setShowPreview(false);
                setCurrentInvoice(null);
                if (!showInvoiceForm) {
                  setCurrentView('history');
                }
              }}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Volver
            </button>
          </div>

          {/* Invoice Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div dangerouslySetInnerHTML={{ __html: createInvoiceHTML(currentInvoice) }} />
          </div>

          {/* Actions - Show download button for all invoices */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={generateInvoiceFile}
              disabled={generatingInvoice}
              className="flex-1 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {generatingInvoice ? 'Generando JPG...' : 'Descargar Factura JPG'}
            </button>
            {showInvoiceForm && (
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
            )}
          </div>

          {/* Status message */}
          {!showInvoiceForm && (
            <div className="text-center py-4 mt-4">
              <p className="text-sm text-gray-500">
                {isConfirmed ? 'Esta venta ha sido confirmada y el inventario fue actualizado.' : 'Esta factura está pendiente de confirmación.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                maxLength={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PIN de 4 dígitos</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa tu PIN"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-como"
                disabled={loading}
                maxLength={4}
                pattern="\d{4}"
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">País *</label>
                <select id="regCountry" className="w-full px-4 py-2 border rounded-lg">
                  <option value="USA">Estados Unidos</option>
                  <option value="Mexico">México</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Estado *</label>
                <input id="regState" placeholder="Ej: Texas..." className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Teléfono para WhatsApp</label>
              <div className="grid grid-cols-3 gap-2">
                <select id="regPhoneLada" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-como">
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+52">🇲🇽 +52 (México)</option>
                  <option value="">Otro</option>
                </select>
                <input id="regPhone" type="tel" placeholder="1234567890" className="col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-como" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Este número se mostrará públicamente para que te contacten por WhatsApp</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input id="regEmail" type="email" className="w-full px-4 py-2 border rounded-lg" />
            </div>

            {/* Dirección y foto removidos del registro: dirección ahora solo estado; foto se configura en perfil */}

            <div>
              <label className="block text-sm font-semibold mb-2">PIN de Seguridad (4 dígitos) *</label>
              <input 
                id="regPin" 
                type="password" 
                placeholder="1234" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-como" 
                maxLength={4}
                pattern="\d{4}"
              />
              <p className="text-xs text-gray-500 mt-1">Este PIN será necesario para iniciar sesión. Guárdalo en un lugar seguro.</p>
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

  // Admin view (must be first)
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  // New feature views (must be before products view)
  if (currentView === 'dashboard') {
    return <DistributorDashboard 
      distributorInfo={distributorInfo}
      invoiceHistory={invoiceHistory}
      inventory={inventory}
      onViewChange={setCurrentView}
      onLogout={handleLogout}
    />;
  }

  if (currentView === 'inventory') {
    return <InventoryManager 
      distributorCode={distributorInfo.code}
      onBack={() => setCurrentView('dashboard')}
    />;
  }

  if (currentView === 'prices') {
    return <PriceManager 
      distributorCode={distributorInfo.code}
      onBack={() => setCurrentView('dashboard')}
    />;
  }

  if (currentView === 'paymentMethods') {
    return <PaymentMethodsManager 
      distributorCode={distributorInfo.code}
      onBack={() => setCurrentView('dashboard')}
    />;
  }

  if (currentView === 'profile') {
    return <ProfileManager 
      distributorCode={distributorInfo.code}
      currentPhotoUrl={distributorInfo.photo_url}
      onBack={() => setCurrentView('dashboard')}
      onSaved={(updates)=> setDistributorInfo({...distributorInfo, ...updates})}
    />;
  }

  if (currentView === 'contacts') {
    return <ContactManager 
      distributorCode={distributorInfo.code}
      invoiceHistory={invoiceHistory}
      onBack={() => setCurrentView('dashboard')}
    />;
  }

  if (currentView === 'pdf-export') {
    return <PDFExporter 
      distributorInfo={distributorInfo}
      invoiceHistory={invoiceHistory}
      onBack={() => setCurrentView('dashboard')}
    />;
  }

  // Main products view
  if (currentView === 'products' && !showInvoiceForm) {
    const selectedCount = Object.keys(selectedProducts).length;
    
    return (
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Facturación</h1>
              <p className="text-sm text-gray-500">
                {distributorInfo.name} {distributorInfo.last_name} • {distributorInfo.state} • {distributorInfo.code}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cerrar Sesión
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* Start Button */}
          {selectedCount > 0 && (
            <div className="mb-8">
              <button
                onClick={() => setShowInvoiceForm(true)}
                className="w-full sm:w-auto px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Comenzar Facturación ({selectedCount})
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {PRODUCTS.map((product, index) => {
              const quantity = selectedProducts[product.name] || 0;
              
              return (
                <div 
                  key={`product-${index}-${product.name}`} 
                  className="group cursor-pointer"
                  onClick={() => {
                    try {
                      handleProductClick(product.name);
                    } catch (error) {
                      console.error('Error clicking product:', error);
                    }
                  }}
                >
                  <div className="relative aspect-square mb-3 bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Error loading image:', product.name);
                        e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                      }}
                    />
                    {quantity > 0 && (
                      <div className="absolute top-2 right-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                        {quantity}
                      </div>
                    )}
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-900 text-center">{product.name}</p>
                    {quantity > 0 && (
                      <div 
                        className="flex items-center justify-center gap-2 mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.name, quantity - 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                        >
                          <BiMinus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.name, quantity + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                        >
                          <BiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // History view
  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900">Historial de Facturas</h1>
              <p className="text-sm text-gray-500 mt-2">Gestiona y confirma tus ventas</p>
            </div>
            <button
              onClick={() => setCurrentView('products')}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Volver a Productos
            </button>
          </div>

          {/* Invoices List */}
          <div className="space-y-4">
            {invoiceHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">No hay facturas generadas aún</p>
              </div>
            ) : (
              invoiceHistory.map((inv) => (
                <div key={inv.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-medium text-gray-900">{inv.client}</h3>
                        {inv.confirmed ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✅ Confirmada
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            ⏳ Pendiente
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Fecha:</span> {inv.date.toLocaleDateString('es-MX')}
                        </div>
                        <div>
                          <span className="font-medium">Total:</span> ${inv.total.toFixed(2)}
                        </div>
                        {inv.confirmedAt && (
                          <div>
                            <span className="font-medium">Confirmada:</span> {inv.confirmedAt.toLocaleDateString('es-MX')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => {
                          const baseInvoice = inv.fullData ? { ...inv.fullData } : {
                            distributor: distributorInfo,
                            client: {
                              firstName: inv.client.split(' ')[0] || '',
                              lastName: inv.client.split(' ').slice(1).join(' ') || '',
                              address: '',
                              city: '',
                              state: '',
                              zipCode: '',
                              phone: '',
                              email: '',
                              clientNumber: ''
                            },
                            products: inv.products || {},
                            productPrices: inv.productPrices || {},
                            shipping: inv.shipping || 0,
                            date: inv.date
                          };

                          if (!baseInvoice.distributor) {
                            baseInvoice.distributor = distributorInfo;
                          }

                          if (baseInvoice.date && !(baseInvoice.date instanceof Date)) {
                            baseInvoice.date = new Date(baseInvoice.date);
                          }

                          baseInvoice.client = { ...(baseInvoice.client || {}) };

                          // Add invoice ID to track confirmation status
                          baseInvoice.invoiceId = inv.id;
                          baseInvoice.confirmed = inv.confirmed;
                          baseInvoice.confirmedAt = inv.confirmedAt ? new Date(inv.confirmedAt) : null;

                          setCurrentInvoice(baseInvoice);
                          setShowPreview(true);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Ver Factura
                      </button>
                      
                      {!inv.confirmed && (
                        <>
                          <button
                            onClick={() => confirmSale(inv.id)}
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            ✅ Confirmar Venta
                          </button>
                          <button
                            onClick={() => cancelSale(inv.id)}
                            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            ❌ Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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
