/**
 * Escapes a value for safe interpolation into an HTML string.
 *
 * The invoice builders assemble markup by hand and inject it with `innerHTML`.
 * Client names, product names and addresses are attacker-controlled (anyone can
 * register a distributor and type anything into a client record), so raw
 * interpolation let stored input execute as markup in the distributor's and the
 * admin's browser.
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
