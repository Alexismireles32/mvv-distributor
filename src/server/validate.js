/**
 * Shared input validation for the API routes.
 *
 * Written after a production audit found three ways to corrupt data through the
 * invoice endpoint: a negative quantity produced an invoice with a negative total
 * (which then subtracted from the admin sales figures), a non-object `products`
 * value was stored verbatim into the JSONB column, and oversized numbers overflowed
 * NUMERIC(12,2) and surfaced as a 500 instead of a validation error.
 */

// NUMERIC(12,2) holds up to 9,999,999,999.99. Stay well under it so no arithmetic
// on these values can overflow before it is stored.
export const MAX_QUANTITY = 10_000;
export const MAX_UNIT_PRICE = 1_000_000;
export const MAX_TOTAL = 10_000_000;

/** True for a plain `{}` object — not an array, not null, not a string. */
export function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Validates a product map and its prices, returning either an error message or the
 * cleaned values plus the authoritative subtotal.
 */
export function validateLineItems(products, productPrices) {
  if (!isPlainObject(products)) {
    return { error: 'La lista de productos es inválida.' };
  }
  if (productPrices !== undefined && !isPlainObject(productPrices)) {
    return { error: 'La lista de precios es inválida.' };
  }

  const entries = Object.entries(products);
  if (entries.length === 0) return { error: 'La factura no tiene productos.' };
  if (entries.length > 200) return { error: 'Demasiados productos en una sola factura.' };

  const cleanProducts = {};
  const cleanPrices = {};
  let subtotal = 0;

  for (const [name, rawQty] of entries) {
    if (typeof name !== 'string' || name.length === 0 || name.length > 200) {
      return { error: 'Nombre de producto inválido.' };
    }

    const qty = Number(rawQty);
    if (!Number.isFinite(qty) || !Number.isInteger(qty) || qty <= 0) {
      return { error: `Cantidad inválida para "${name}": debe ser un entero positivo.` };
    }
    if (qty > MAX_QUANTITY) {
      return { error: `Cantidad para "${name}" excede el máximo de ${MAX_QUANTITY}.` };
    }

    const price = Number((productPrices ?? {})[name] ?? 0);
    if (!Number.isFinite(price) || price < 0) {
      return { error: `Precio inválido para "${name}".` };
    }
    if (price > MAX_UNIT_PRICE) {
      return { error: `Precio para "${name}" excede el máximo permitido.` };
    }

    cleanProducts[name] = qty;
    cleanPrices[name] = price;
    subtotal += qty * price;
  }

  return { products: cleanProducts, productPrices: cleanPrices, subtotal };
}

/** Validates a money amount such as shipping. */
export function validateAmount(value, label = 'El monto') {
  const amount = Number(value ?? 0);
  if (!Number.isFinite(amount) || amount < 0) return { error: `${label} es inválido.` };
  if (amount > MAX_TOTAL) return { error: `${label} excede el máximo permitido.` };
  return { amount };
}

/** Guards the final total against the column's range. */
export function validateTotal(total) {
  if (!Number.isFinite(total) || total < 0) return { error: 'El total calculado es inválido.' };
  if (total > MAX_TOTAL) return { error: 'El total de la factura excede el máximo permitido.' };
  return { total };
}

/** Coerces a client record to safe strings, ignoring anything that is not an object. */
export function sanitizeClient(client) {
  const source = isPlainObject(client) ? client : {};
  const str = (v, max = 300) =>
    v === null || v === undefined ? '' : String(v).slice(0, max);

  return {
    clientNumber: str(source.clientNumber, 100).trim(),
    firstName: str(source.firstName, 150),
    lastName: str(source.lastName, 150),
    address: str(source.address, 400),
    city: str(source.city, 150),
    state: str(source.state, 150),
    zipCode: str(source.zipCode, 30),
    phone: str(source.phone, 50),
    email: str(source.email, 200)
  };
}
