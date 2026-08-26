/**
 * Currency follows the distributor's country.
 *
 * `country` comes from the registration dropdown and is either "USA" or "Mexico".
 * Anything unrecognised is treated as USA, which is the business default.
 *
 * Previously every total was labelled "USD", so a Mexican distributor collecting
 * through OXXO still quoted their customers in dollars.
 */

/** The set of values that count as Mexico, tolerant of accents and abbreviations. */
export function isMexico(country) {
  return /^(mexico|méxico|mx|mex)$/i.test(String(country ?? '').trim());
}

export function currencyCode(country) {
  return isMexico(country) ? 'MXN' : 'USD';
}

/** "$1234.50 USD" — the symbol plus an explicit code, since both use "$". */
export function formatMoney(amount, country) {
  const value = Number(amount) || 0;
  return `$${value.toFixed(2)} ${currencyCode(country)}`;
}

/** "$1234.50" — symbol only, for tables where the code is shown once nearby. */
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
