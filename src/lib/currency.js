/**
 * Currency follows the distributor's country.
 *
 * `country` comes from the registration dropdown and is either "USA" or "Mexico".
 * Anything else (including null, for distributors created before the field existed)
 * falls back to MXN, matching how payment methods already treat non-USA as Mexico.
 *
 * Previously every total was labelled "USD", so a Mexican distributor collecting
 * through OXXO still quoted their customers in dollars.
 */

export function currencyCode(country) {
  return country === 'USA' ? 'USD' : 'MXN';
}

/** "$1,234.50 MXN" — the symbol plus an explicit code, since both use "$". */
export function formatMoney(amount, country) {
  const value = Number(amount) || 0;
  return `$${value.toFixed(2)} ${currencyCode(country)}`;
}

/** "$1,234.50" — symbol only, for tables where the code is shown once nearby. */
export function formatAmount(amount) {
  const value = Number(amount) || 0;
  return `$${value.toFixed(2)}`;
}

/** Locale-aware formatting for summary screens. */
export function formatCurrencyIntl(amount, country) {
  const code = currencyCode(country);
  try {
    return new Intl.NumberFormat(code === 'USD' ? 'en-US' : 'es-MX', {
      style: 'currency',
      currency: code
    }).format(Number(amount) || 0);
  } catch {
    return formatMoney(amount, country);
  }
}
