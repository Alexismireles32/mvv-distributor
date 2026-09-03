/**
 * Slugs for the /d/<slug> vanity URLs.
 *
 * Deliberately not root-level (/delmira): the site already owns 52 top-level routes,
 * several of which read like first names (/serenity, /primrose, /floryva). A
 * root-level distributor URL would compete with those, and — worse — adding a product
 * page later would silently shadow a distributor's link with no error. The /d/ prefix
 * is a namespace nothing else can occupy.
 */

/**
 * "María José Lópéz" -> "maria-jose-lopez"
 *
 * Accents are stripped because nobody types them into an address bar, and the
 * lookup is case-insensitive for the same reason.
 */
export function slugify(value) {
  return String(value ?? '')
    .normalize('NFD')                    // split accented chars into base + mark
    .replace(/[̀-ͯ]/g, '')     // drop the combining marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')         // anything else becomes a separator
    .replace(/^-+|-+$/g, '')             // trim leading/trailing separators
    .slice(0, 60);
}

/** True for a slug that is safe to put in a URL and store. */
export function isValidSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 60;
}

/**
 * Picks a free slug from a name, appending the surname and then a counter only when
 * needed — so two distributors called "Maria" become `maria` and `maria-lopez`
 * rather than one of them silently failing to get a URL.
 */
export function buildUniqueSlug(firstName, lastName, taken) {
  const takenSet = taken instanceof Set ? taken : new Set(taken || []);
  const base = slugify(firstName) || 'distribuidor';

  if (!takenSet.has(base)) return base;

  const withLast = slugify(`${firstName} ${lastName || ''}`);
  if (withLast && withLast !== base && !takenSet.has(withLast)) return withLast;

  for (let n = 2; n < 1000; n++) {
    const candidate = `${base}-${n}`;
    if (!takenSet.has(candidate)) return candidate;
  }
  return `${base}-${Date.now()}`;
}
