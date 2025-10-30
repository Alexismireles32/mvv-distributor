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
        return prevCart.map(item =>
          item.name === productName
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const product = PRODUCTS.find(p => p.name === productName);
        return [...prevCart, {
          name: productName,
          quantity,
          price,
          image: product?.image || ''
        }];
      }
    });
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

  return (
    <CartContext.Provider value={value}>
      {children}
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
      
      // Open WhatsApp
      window.open(whatsappLink, '_blank');

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
      <div style="padding: 40px; font-family: Arial, sans-serif; background: white;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png" alt="MVV Natural" style="height: 60px; margin-bottom: 20px;">
          <h1 style="font-size: 28px; color: #111827; margin: 0;">Orden de Compra</h1>
          <p style="color: #6b7280; margin-top: 10px;">Fecha: ${new Date().toLocaleDateString('es-MX')}</p>
        </div>

        <!-- Distributor Info -->
        <div style="background: #f9fafb; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 10px 0;">Distribuidor</h3>
          <p style="font-size: 18px; color: #111827; margin: 0; font-weight: 600;">${distributorInfo.name} ${distributorInfo.last_name}</p>
          <p style="font-size: 14px; color: #6b7280; margin: 5px 0 0 0;">Código: ${distributorInfo.code}</p>
          <p style="font-size: 14px; color: #6b7280; margin: 5px 0 0 0;">Teléfono: ${distributorInfo.phone}</p>
        </div>

        <!-- Customer Info -->
        <div style="background: #f9fafb; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 10px 0;">Cliente</h3>
          <p style="font-size: 16px; color: #111827; margin: 0;">${customerInfo.firstName} ${customerInfo.lastName}</p>
          <p style="font-size: 14px; color: #6b7280; margin: 5px 0 0 0;">Teléfono: ${customerInfo.phone}</p>
          ${customerInfo.email ? `<p style="font-size: 14px; color: #6b7280; margin: 5px 0 0 0;">Email: ${customerInfo.email}</p>` : ''}
          ${customerInfo.address ? `<p style="font-size: 14px; color: #6b7280; margin: 5px 0 0 0;">Dirección: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}</p>` : ''}
        </div>

        <!-- Products Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
              <th style="padding: 12px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">Producto</th>
              <th style="padding: 12px; text-align: center; font-size: 12px; color: #6b7280; text-transform: uppercase;">Cantidad</th>
              <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; text-transform: uppercase;">Precio Unit.</th>
              <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; text-transform: uppercase;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>

        <!-- Total -->
        <div style="text-align: right; margin-bottom: 30px;">
          <p style="font-size: 24px; color: #111827; font-weight: 700; margin: 0;">Total Estimado: $${total.toFixed(2)}</p>
          <p style="font-size: 12px; color: #6b7280; margin: 10px 0 0 0;">*El precio puede variar según costo de envío</p>
        </div>

        <!-- Payment Method -->
        <div style="background: #f9fafb; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 10px 0;">Método de Pago Seleccionado</h3>
          <p style="font-size: 18px; color: #111827; margin: 0; font-weight: 600;">${selectedPaymentMethod}</p>
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

