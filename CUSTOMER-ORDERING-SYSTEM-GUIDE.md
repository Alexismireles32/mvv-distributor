# 🛒 Customer Ordering System - Complete Guide

## Overview

The customer ordering system allows visitors to place orders directly through your distributors. This creates a seamless experience where customers can browse products with distributor-specific pricing, add items to their cart, generate a professional order invoice, and send it directly to their distributor via WhatsApp.

---

## 🎯 How It Works (Customer Flow)

### Step 1: Visit Products Page
Customers visit `/productos` and see all available products.

### Step 2: Enter Distributor Code
At the top of the products page, there's an **"Iniciar Orden"** section where customers enter their distributor's code.

### Step 3: Activation
Once a valid code is entered:
- ✅ Distributor information is loaded from Supabase
- ✅ Product prices (configured by the distributor) are fetched
- ✅ All product cards now display:
  - **Price** (set by the distributor)
  - **"Agregar al Carrito"** button
  - **"Ver Producto"** button (existing functionality)

### Step 4: Shopping
Customers can:
- Click **"Agregar al Carrito"** to select quantity and add products
- Click **"Ver Producto"** to see full details on individual product pages
- Individual product pages also show prices and have "Add to Cart" functionality

### Step 5: Cart Management
A **cart icon** appears in the navbar showing the number of items. Clicking it opens a sidebar where customers can:
- View all items
- Adjust quantities
- Remove items
- See the estimated total

### Step 6: Checkout
Customer clicks **"Generar Orden"** and enters:
- First Name *
- Last Name *
- Phone *
- Email (optional)
- Address (optional)
- City, State, Zip Code (optional)

### Step 7: Payment Method Selection
Customer selects from payment methods **configured by the distributor**:
- **USA distributors**: Zelle, Venmo, Cash App, PayPal, Credit Card, Cash
- **Mexico distributors**: OXXO, SPEI, Transferencia, Efectivo, Tarjeta

### Step 8: Order Generation
System generates:
1. **Professional invoice (JPG)** with:
   - Distributor information
   - Customer information
   - Product list with quantities and prices
   - Total (with shipping note)
   - Payment method selected
2. **Automatic download** to customer's device
3. **WhatsApp message** opens automatically with:
   - Pre-filled message in Spanish
   - Order summary
   - Total amount
   - Payment method
   - Prompt to attach the downloaded image

### Step 9: Customer Sends to Distributor
WhatsApp opens to the distributor's number with everything ready. Customer just needs to:
1. Attach the downloaded invoice image
2. Press send

---

## 🛠 How It Works (Distributor Flow)

### Step 1: Configure Prices
Distributors log into `/distribuidores` and go to:
- **Dashboard** → **Precios**
- Set custom prices for each product
- Prices are saved to Supabase (`distributor_prices` table)

### Step 2: Configure Payment Methods
Distributors go to:
- **Dashboard** → **Métodos de Pago**
- Select which payment methods they accept
- Based on their country (USA or Mexico)
- Saved to Supabase (`distributors.payment_methods_usa` or `payment_methods_mexico`)

### Step 3: Share Distributor Code
Distributor shares their unique code with customers (e.g., "ABC123").

### Step 4: Receive Orders
When customers place orders:
1. WhatsApp message arrives with complete order details
2. Customer attaches the professional invoice image
3. Distributor can review and process the order

---

## 🗄 Database Schema

### New/Updated Tables

#### `distributors` table
```sql
ALTER TABLE distributors
ADD COLUMN IF NOT EXISTS payment_methods_usa jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS payment_methods_mexico jsonb DEFAULT '[]'::jsonb;
```

**Example data:**
```json
{
  "code": "ABC123",
  "name": "John",
  "last_name": "Doe",
  "country": "USA",
  "phone": "+15551234567",
  "payment_methods_usa": ["Zelle", "Venmo", "Cash App"],
  "payment_methods_mexico": []
}
```

#### `distributor_prices` table (existing)
Stores custom prices set by each distributor:
```sql
{
  "distributor_code": "ABC123",
  "product_name": "Duo-60 Fusion",
  "price": 45.99
}
```

---

## 📦 Components Created

### Core Components

1. **`customer-cart.jsx`**
   - `CartProvider`: Context for global cart state
   - `CartSidebar`: Full cart UI with checkout flow
   - `CartIconButton`: Navbar cart icon
   - `useCart`: Hook to access cart functionality

2. **`customer-order-activator.jsx`**
   - Banner component for entering distributor code
   - Shows active distributor info when activated

3. **`payment-methods-manager.jsx`**
   - Distributor-facing component to configure payment methods
   - Separate options for USA and Mexico

4. **`product-card-with-cart.jsx`**
   - Reusable product card
   - Shows price and "Add to Cart" when order is active
   - Quantity selector before adding to cart

5. **`product-04-enhanced.jsx`**
   - Enhanced version of Product04 with cart functionality

6. **`product-04_1-enhanced.jsx`**
   - Enhanced version of Product04_1

7. **`product-04_2-enhanced.jsx`**
   - Enhanced version of Product04_2

8. **`product-page-wrapper-enhanced.jsx`**
   - Individual product page with cart functionality
   - Shows price at top
   - Large "Add to Cart" button with quantity selector

---

## 🔑 Key Features

### ✅ Implemented Features

1. **Distributor Code Activation**
   - Enter code on products page
   - Validates against Supabase
   - Loads distributor info and prices

2. **Dynamic Pricing**
   - Each distributor sets their own prices
   - Prices display automatically when code is entered
   - Different prices for different distributors

3. **Cart Management**
   - Add/remove items
   - Adjust quantities
   - Real-time total calculation
   - Persistent across page navigation (context state)

4. **Cart Icon in Navbar**
   - Only visible when order is active
   - Shows item count badge
   - Opens cart sidebar on click

5. **Checkout Flow**
   - Customer information form
   - Payment method selection (filtered by distributor's accepted methods)
   - Form validation

6. **Invoice Generation**
   - Professional JPG invoice
   - Uses html2canvas for rendering
   - Includes all order details
   - Auto-downloads to device

7. **WhatsApp Integration**
   - Opens automatically after invoice generation
   - Pre-filled message in Spanish
   - Includes order summary
   - Distributor's phone number (with international format)

8. **Payment Methods Configuration**
   - Distributors select accepted methods
   - USA-specific options (Zelle, Venmo, etc.)
   - Mexico-specific options (OXXO, SPEI, etc.)
   - Customers only see selected methods

9. **Responsive Design**
   - Mobile-friendly throughout
   - Minimal, elegant UI
   - Professional appearance

10. **Product Pages Integration**
    - Individual product pages show prices
    - "Add to Cart" button on product pages
    - Consistent experience across site

---

## 🎨 Design Principles

Following your requirements for **minimal, elegant, professional** design:

- **2 colors max**: Black and white/gray with minimal accent
- **No cards**: Clean text-only layouts
- **Buttons are the only enclosed elements**
- **Centered layouts**: Proper use of max-width containers
- **Mobile-first**: Fully responsive on all devices
- **Professional typography**: Clean, readable fonts
- **Subtle interactions**: Hover states, transitions

---

## 🚀 Usage Instructions

### For Distributors

1. **Set Up Your Profile**
   - Log in to `/distribuidores`
   - Enter your code and PIN

2. **Configure Prices**
   - Go to Dashboard → Precios
   - Set your custom price for each product
   - Click "Guardar Precios"

3. **Configure Payment Methods**
   - Go to Dashboard → Métodos de Pago
   - Select methods you accept
   - Click "Guardar Métodos de Pago"

4. **Share Your Code**
   - Give your distributor code to customers
   - They'll use it on the products page

### For Customers

1. **Visit Products Page**
   - Go to `/productos`

2. **Enter Distributor Code**
   - Type the code in "Iniciar Orden" section
   - Click "Activar Orden"

3. **Shop**
   - Prices now visible on all products
   - Click "Agregar al Carrito" on any product
   - Choose quantity and confirm

4. **Review Cart**
   - Click cart icon in navbar
   - Adjust quantities if needed
   - Click "Generar Orden"

5. **Enter Your Information**
   - Fill in required fields (name, phone)
   - Select payment method
   - Click "Enviar a Distribuidor"

6. **Send via WhatsApp**
   - Image downloads automatically
   - WhatsApp opens with message
   - Attach the downloaded image
   - Send to distributor

---

## 🔧 Technical Details

### State Management
- **React Context API** for global cart state
- `CartProvider` wraps entire app on pages that need cart
- `useCart()` hook provides access to cart functions

### Data Flow
1. Customer enters distributor code
2. `activateOrder()` fetches distributor data from Supabase
3. Fetches prices from `distributor_prices` table
4. Updates context state
5. All components re-render with new prices
6. Cart operations update context state
7. Checkout generates invoice HTML
8. html2canvas converts to JPG
9. WhatsApp link constructed with message

### Supabase Queries
```javascript
// Fetch distributor
const { data, error } = await supabase
  .from('distributors')
  .select('*')
  .eq('code', code)
  .single();

// Fetch prices
const { data, error } = await supabase
  .from('distributor_prices')
  .select('*')
  .eq('distributor_code', code);
```

### Invoice Generation
```javascript
// Create HTML → Canvas → JPG
const html = createInvoiceHTML(orderData);
const canvas = await html2canvas(tempDiv, options);
const jpgURL = canvas.toDataURL('image/jpeg', 0.9);
```

### WhatsApp Link
```javascript
const message = encodeURIComponent(`Hola ${distributor.name}, mi orden sería: ...`);
const link = `https://wa.me/${phone}?text=${message}`;
window.open(link, '_blank');
```

---

## 📝 SQL Setup

Run this in Supabase SQL Editor:

```sql
-- Add payment methods columns
ALTER TABLE distributors
ADD COLUMN IF NOT EXISTS payment_methods_usa jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS payment_methods_mexico jsonb DEFAULT '[]'::jsonb;

-- Add comments
COMMENT ON COLUMN distributors.payment_methods_usa IS 'Array of payment methods accepted by USA distributors';
COMMENT ON COLUMN distributors.payment_methods_mexico IS 'Array of payment methods accepted by Mexico distributors';

-- Verify
SELECT code, name, country, payment_methods_usa, payment_methods_mexico 
FROM distributors LIMIT 5;
```

---

## ✨ Next Steps / Enhancements

Potential future improvements:
1. **Order History for Customers**: Save orders to Supabase for customer reference
2. **SMS Notifications**: Send SMS to distributor when order is placed
3. **Email Confirmation**: Send email receipt to customer
4. **Multi-language Support**: Add English translations
5. **Order Status Tracking**: Allow distributors to update order status
6. **Inventory Alerts**: Notify when products in customer's cart are low stock
7. **Discount Codes**: Allow distributors to create promo codes
8. **Bulk Orders**: Special pricing for wholesale/bulk purchases

---

## 🐛 Troubleshooting

### Issue: Prices not showing after entering code
**Solution**: 
- Verify distributor has set prices in their dashboard
- Check Supabase `distributor_prices` table has entries for that distributor code

### Issue: Payment methods not appearing
**Solution**:
- Verify distributor has configured payment methods
- Check Supabase `distributors` table has `payment_methods_usa` or `payment_methods_mexico` populated

### Issue: WhatsApp not opening
**Solution**:
- Verify distributor phone number is in correct format (+1XXXXXXXXXX or +52XXXXXXXXXX)
- Check browser allows popups

### Issue: Invoice image not downloading
**Solution**:
- Check browser allows downloads
- Verify html2canvas is installed (`npm install html2canvas`)

---

## 📊 Metrics to Track

Consider tracking:
- Number of orders per distributor
- Average order value
- Most popular products
- Conversion rate (visitors → orders)
- Payment method preferences
- Order completion rate

---

## 🎉 Success!

You now have a **complete, professional, commercial-grade customer ordering system** that:
- ✅ Works seamlessly
- ✅ Looks professional
- ✅ Is easy to use
- ✅ Integrates with WhatsApp
- ✅ Supports multiple distributors
- ✅ Has flexible pricing
- ✅ Allows payment method configuration
- ✅ Generates beautiful invoices
- ✅ Is mobile-friendly
- ✅ Follows best UX practices

**This system is ready for production use!** 🚀

