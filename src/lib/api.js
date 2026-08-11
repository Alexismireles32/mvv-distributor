/**
 * Browser-side API client.
 *
 * Replaces the old `supabase.from(...)` calls. Components no longer hold database
 * credentials or choose their own row filters — every request goes through an API
 * route that derives scope from the httpOnly session cookie.
 */

async function request(path, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      // Required so the session cookie rides along.
      credentials: 'same-origin'
    });
  } catch (networkError) {
    // A dead network never reaches the server, so there is no JSON to parse. Turn it
    // into the same shape as an API error rather than letting a raw TypeError escape.
    throw new ApiError('No se pudo conectar con el servidor. Revisa tu conexión.', 0);
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Non-JSON body (a proxy error page, for instance).
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.error || `Error del servidor (${response.status}).`,
      response.status
    );
  }

  return payload;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** True when the failure means "not logged in" rather than a real error. */
export function isAuthError(error) {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}

export const api = {
  // --- auth ---
  login: (code, pin) => request('/api/auth/login', { method: 'POST', body: { code, pin } }),
  session: () => request('/api/auth/session'),
  logout: () => request('/api/auth/session', { method: 'DELETE' }),
  register: (payload) =>
    request('/api/distributors/register', { method: 'POST', body: payload }),

  // --- public ---
  lookupDistributor: (code) => request(`/api/distributors/${encodeURIComponent(code)}`),

  // --- logged-in distributor ---
  myData: () => request('/api/me/data'),
  createInvoice: (payload) => request('/api/me/invoices', { method: 'POST', body: payload }),
  confirmInvoice: (invoiceId) =>
    request('/api/me/invoices', { method: 'PATCH', body: { invoiceId } }),
  deleteInvoice: (invoiceId) =>
    request('/api/me/invoices', { method: 'DELETE', body: { invoiceId } }),
  saveSettings: (payload) => request('/api/me/settings', { method: 'PUT', body: payload }),

  // --- admin ---
  adminDistributors: () => request('/api/admin/distributors'),
  adminUpdateDistributor: (payload) =>
    request('/api/admin/distributors', { method: 'PATCH', body: payload }),
  adminInvoices: (code) =>
    request(`/api/admin/invoices?code=${encodeURIComponent(code)}`),

  adminProducts: () => request('/api/admin/products'),
  adminCreateProduct: (payload) => request('/api/admin/products', { method: 'POST', body: payload }),
  adminUpdateProduct: (payload) => request('/api/admin/products', { method: 'PATCH', body: payload }),
  adminDeleteProduct: (payload) => request('/api/admin/products', { method: 'DELETE', body: payload })
};
