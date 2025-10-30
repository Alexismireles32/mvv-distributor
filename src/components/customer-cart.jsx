"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { BiMinus, BiPlus, BiCart, BiTrash } from 'react-icons/bi';
import { supabase } from '../lib/supabase';
import { PRODUCTS } from './product-catalog';

// Context for cart state management across the app
const CartContext = createContext();

export function CartProvider({ children }) {
  const [distributorCode, setDistributorCode] = useState('');
  const [distributorInfo, setDistributorInfo] = useState(null);
  const [distributorPrices, setDistributorPrices] = useState({});
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    window.clearTimeout((showNotification)._t);
    (showNotification)._t = window.setTimeout(() => setNotification(""), 2200);
  };
  const [isOrderActive, setIsOrderActive] = useState(false);

  // Load distributor data when code is entered
  const activateOrder = async (code) => {
    try {
      if (!supabase) {
        alert('Sistema no disponible');
        return false;
      }

      // Fetch distributor info
      const { data: distData, error: distError } = await supabase
        .from('distributors')
        .select('*')
        .eq('code', code)
        .single();

      if (distError || !distData) {
        alert('Código de distribuidor no válido');
        return false;
      }

      // Fetch distributor prices
      const { data: pricesData, error: pricesError } = await supabase
        .from('distributor_prices')
        .select('*')
        .eq('distributor_code', code);

      const pricesObj = {};
      if (!pricesError && pricesData) {
        pricesData.forEach(item => {
          pricesObj[item.product_name] = parseFloat(item.price) || 0;
        });
      }

      setDistributorCode(code);
      setDistributorInfo(distData);
      setDistributorPrices(pricesObj);
      setIsOrderActive(true);
      // Persist code in URL for continuity
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('code', code);
        window.history.replaceState({}, '', url.toString());
      } catch {}
      showNotification(`Precios del distribuidor #${code} activados`);
      
      return true;
    } catch (error) {
      console.error('Error activating order:', error);
      alert('Error al cargar información del distribuidor');
      return false;
    }
  };

  const addToCart = (productName, quantity = 1) => {
    const price = distributorPrices[productName] || 0;
    
    setCart(prevCart => {
      const existing = prevCart.find(item => item.name === productName);
      if (existing) {
        const updated = prevCart.map(item =>
          item.name === productName
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return updated;
      } else {
        const product = PRODUCTS.find(p => p.name === productName);
        const newCart = [...prevCart, {
          name: productName,
          quantity,
          price,
          image: product?.image || ''
        }];
        return newCart;
      }
    });

    // Notify user
    showNotification(`${quantity} x ${productName} agregado al carrito`);
  };

  const updateQuantity = (productName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productName);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.name === productName ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productName) => {
    setCart(prevCart => prevCart.filter(item => item.name !== productName));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const value = {
    distributorCode,
    distributorInfo,
    distributorPrices,
    cart,
    isCartOpen,
    isOrderActive,
    setIsCartOpen,
    activateOrder,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotal
  };

  // Auto-activate from URL query param (?code=123) on first mount
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code && /^\d{3}$/.test(code)) {
        activateOrder(code);
      }
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider value={value}>
      {children}
      {notification && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] bg-black text-white text-sm px-4 py-2 shadow-lg">
          {notification}
        </div>
      )}
      {isOrderActive && <CartSidebar />}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Return null instead of throwing error for SSR compatibility
    return null;
  }
  return context;
}

// Cart sidebar component
function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    distributorInfo,
    distributorPrices,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal
  } = useCart();

  const [currentView, setCurrentView] = useState('cart'); // 'cart' | 'checkout' | 'invoice'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [generatingInvoice, setGeneratingInvoice] = useState(false);

  // Get payment methods for current distributor
  const paymentMethods = distributorInfo?.country === 'USA'
    ? distributorInfo?.payment_methods_usa || []
    : distributorInfo?.payment_methods_mexico || [];

  const handleGenerateOrder = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    setCurrentView('checkout');
  };

  const handleProceedToInvoice = () => {
    // Validate customer info
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone) {
      alert('Por favor completa la información básica (nombre, apellido, teléfono)');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    setCurrentView('invoice');
    generateInvoiceAndWhatsApp();
  };

  const generateInvoiceAndWhatsApp = async () => {
    try {
      setGeneratingInvoice(true);

      // Open a placeholder window immediately to avoid popup blockers
      let waWindow = null;
      try {
        waWindow = window.open('about:blank', '_blank');
      } catch (_) {}

      // Create invoice HTML
      const invoiceHTML = createCustomerInvoiceHTML();
      
      // Import html2canvas dynamically
      const html2canvas = (await import('html2canvas')).default;

      // Create temporary div for rendering
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = invoiceHTML;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '1200px';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);

      // Wait for images to load
      const images = tempDiv.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Generate canvas
      const canvas = await html2canvas(tempDiv, {
        width: 1200,
        height: tempDiv.scrollHeight,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Download the JPG
      const link = document.createElement('a');
      link.download = `orden_${customerInfo.firstName}_${customerInfo.lastName}_${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();

      // Clean up
      document.body.removeChild(tempDiv);

      // Show success message
      alert('✅ La imagen de su orden ha sido guardada en su dispositivo');

      // Generate WhatsApp message
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappNumber = distributorInfo.phone.replace(/\D/g, '');
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp (use pre-opened window if available to bypass blockers)
      if (waWindow && !waWindow.closed) {
        waWindow.location.href = whatsappLink;
      } else {
        window.open(whatsappLink, '_blank', 'noopener');
      }

      // Clear cart after successful order
      clearCart();
      setIsCartOpen(false);
      setCurrentView('cart');

    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error al generar la orden. Intenta nuevamente.');
    } finally {
      setGeneratingInvoice(false);
    }
  };

  const createCustomerInvoiceHTML = () => {
    const total = getTotal();
    const productsHTML = cart.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; text-align: left;">${item.name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: 600;">$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `).join('');
    return `
      <div class="inv-container" style="padding: 24px; font-family: Arial, sans-serif; background: #FAF8F3; color:#1f2937;">
        <style>
          .inv-header{display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:2px solid #4A7C59;padding-bottom:12px;margin-bottom:16px}
          .inv-brand{display:flex;align-items:center;gap:10px}
          .inv-brand img{height:40px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.06))}
          .inv-title{margin:0;color:#376A4E;font-size:20px}
          .inv-meta{font-size:12px;color:#374151;text-align:right}
          .inv-info{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
          .inv-info h3{margin:0 0 6px;color:#376A4E;font-size:12px;text-transform:uppercase}
          .inv-info p{margin:3px 0;font-size:12px}
          .inv-table{width:100%;border-collapse:collapse;margin-bottom:12px;background:#fff;border:1px solid #e5e7eb}
          .inv-table th{padding:10px;text-align:left;border-bottom:1px solid #e5e7eb;background:#EAF3ED;font-size:12px;color:#2f5f46}
          .inv-table td{padding:10px;border-bottom:1px solid #f1f5f9;font-size:12px}
          .inv-totals{text-align:right;margin-bottom:12px}
          .inv-legal{margin-top:6px;padding-top:10px;border-top:1px solid #e5e7eb}
          .inv-legal p{font-size:10px;color:#4b5563;line-height:1.5;text-align:center;margin:0}
          @media (max-width: 480px){
            .inv-container{padding:16px}
            .inv-brand img{height:32px}
            .inv-title{font-size:18px}
            .inv-info{grid-template-columns:1fr}
            .inv-table th,.inv-table td{padding:8px;font-size:11px}
          }
        </style>

        <div class="inv-header">
          <div class="inv-brand">
            <img src="https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png" alt="MVV Natural">
            <h1 class="inv-title">Orden de Compra</h1>
          </div>
          <div class="inv-meta">Fecha: ${new Date().toLocaleDateString('es-MX')}</div>
        </div>

        <div class="inv-info">
          <div>
            <h3>Distribuidor</h3>
            <p><strong>${distributorInfo.name} ${distributorInfo.last_name}</strong></p>
            <p>Código: ${distributorInfo.code}</p>
            <p>Teléfono: ${distributorInfo.phone}</p>
          </div>
          <div>
            <h3>Cliente</h3>
            <p>${customerInfo.firstName} ${customerInfo.lastName}</p>
            <p>Teléfono: ${customerInfo.phone}</p>
            ${customerInfo.email ? `<p>Email: ${customerInfo.email}</p>` : ''}
            ${customerInfo.address ? `<p>Dirección: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}</p>` : ''}
          </div>
        </div>

        <table class="inv-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th style="text-align:center">Cantidad</th>
              <th style="text-align:right">Precio Unit.</th>
              <th style="text-align:right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>

        <div class="inv-totals">
          <p style="font-size:18px;margin:0;">Total Estimado: $${total.toFixed(2)}</p>
          <p style="font-size:11px;color:#6b7280;margin:6px 0 0 0;">*El precio puede variar según costo de envío</p>
        </div>

        <div style="background: #f9fafb; padding: 14px; margin-bottom: 14px; border-radius: 6px;">
          <h3 style="font-size: 12px; color: #6b7280; text-transform: uppercase; margin: 0 0 6px 0;">Método de Pago Seleccionado</h3>
          <p style="font-size: 16px; color: #111827; margin: 0; font-weight: 600;">${selectedPaymentMethod}</p>
        </div>

        <!-- Legal Disclaimer (same as distributor invoice) -->
        <div style="margin-top: 10px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 10px; color: #6b7280; line-height: 1.5; text-align: center; margin: 0;">
            Comprobante de cotización MVV Natural generado para comunicación con un distribuidor autorizado. 
            Los productos son naturales. El uso correcto es responsabilidad del cliente. 
            Los montos pueden variar según envío y condiciones finales. El distribuidor actúa como agente autorizado.
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">MVV Natural - Suplementos 100% Naturales</p>
          <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">www.mvvnatural.com</p>
        </div>
      </div>
    `;
  };

  const generateWhatsAppMessage = () => {
    const productsList = cart.map(item => 
      `${item.quantity} ${item.name}`
    ).join(' y ');

    const total = getTotal();

    return `Hola ${distributorInfo.name}, mi orden sería:\n\n${productsList}\n\nSería un total aproximado de $${total.toFixed(2)} USD\n\nMétodo de pago: ${selectedPaymentMethod}\n\n*El precio puede variar según costo de envío\n\nAquí te dejo la imagen de mi cotización 👇`;
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" onClick={() => setIsCartOpen(false)}>
      <div className="bg-white w-full max-w-2xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-light text-gray-900">
            {currentView === 'cart' && 'Tu Orden'}
            {currentView === 'checkout' && 'Información de Entrega'}
            {currentView === 'invoice' && 'Orden Generada'}
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-900 text-2xl">×</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentView === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <BiCart className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                      <div className="flex-1">
                        <h3 className="text-base text-gray-900 font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                        >
                          <BiMinus />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                        >
                          <BiPlus />
                        </button>
                      </div>
                      <p className="text-base font-medium text-gray-900 w-20 text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <BiTrash className="text-xl" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {currentView === 'checkout' && (
            <div className="space-y-6">
              {/* Customer Info Form */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Tu Información</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre *"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Apellido *"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="col-span-2 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="col-span-2 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Dirección (opcional)"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="col-span-2 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    value={customerInfo.state}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, state: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Código Postal"
                    value={customerInfo.zipCode}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="col-span-2 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Método de Pago *</h3>
                {paymentMethods.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map(method => (
                      <button
                        key={method}
                        onClick={() => setSelectedPaymentMethod(method)}
                        className={`px-4 py-3 border-2 text-sm transition-all ${
                          selectedPaymentMethod === method
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-red-600">Este distribuidor aún no ha configurado métodos de pago</p>
                )}
              </div>
            </div>
          )}

          {currentView === 'invoice' && (
            <div className="text-center py-12">
              {generatingInvoice ? (
                <>
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Generando tu orden...</p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">¡Orden Enviada!</h3>
                  <p className="text-gray-600 mb-6">
                    La imagen de tu orden se ha guardado y WhatsApp se abrirá automáticamente para contactar a tu distribuidor.
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {currentView !== 'invoice' && (
          <div className="p-6 border-t border-gray-200">
            {currentView === 'cart' && cart.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-900">Total Estimado:</span>
                  <span className="text-2xl font-medium text-gray-900">${getTotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">*El precio puede variar según costo de envío</p>
                <button
                  onClick={handleGenerateOrder}
                  className="w-full px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-medium"
                >
                  Generar Orden
                </button>
              </>
            )}

            {currentView === 'checkout' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentView('cart')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Volver
                </button>
                <button
                  onClick={handleProceedToInvoice}
                  disabled={!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone || !selectedPaymentMethod}
                  className="flex-1 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar a Distribuidor
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Cart icon button for navbar
export function CartIconButton() {
  const cart = useCart();
  
  // Return null if not within CartProvider (e.g., on pages without cart functionality)
  if (!cart) return null;
  
  const { isOrderActive, getTotalItems, setIsCartOpen } = cart;

  if (!isOrderActive) return null;

  const itemCount = getTotalItems();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-gray-700 hover:text-black transition-colors"
      aria-label="Carrito de compras"
    >
      <BiCart className="text-2xl" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {itemCount}
        </span>
      )}
    </button>
  );
}

