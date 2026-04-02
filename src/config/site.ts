/** Public site name (document title suffix). */
export const SITE_NAME = 'My Products App';

export const DEFAULT_DESCRIPTION =
  'Discover products, explore countries and travel insights, read community updates, and manage your wishlist and orders.';

/** Truncate for meta description (recommended ~150–160 chars). */
export function truncateMeta(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/**
 * Site origin for canonical and Open Graph URLs.
 * Set `VITE_SITE_URL` in production (e.g. https://example.com) for SSR/preview; in the browser we use `location.origin`.
 */
export function getSiteOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  return fromEnv?.replace(/\/$/, '') ?? '';
}

export function absoluteUrl(pathnameAndSearch: string): string {
  const path = pathnameAndSearch.startsWith('/')
    ? pathnameAndSearch
    : `/${pathnameAndSearch}`;
  const origin = getSiteOrigin();
  return origin ? `${origin}${path}` : path;
}

/** Use remote or absolute URLs for og:image / twitter:image. */
export function ensureAbsoluteUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('https://') || url.startsWith('http://')) return url;
  const origin = getSiteOrigin();
  if (!origin) return undefined;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${origin}${path}`;
}
