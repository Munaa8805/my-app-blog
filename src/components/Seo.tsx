import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  absoluteUrl,
  truncateMeta,
  ensureAbsoluteUrl,
} from '../config/site';

export type SeoProps = {
  title: string;
  description?: string;
  ogImage?: string | null;
  /** Search engines: omit or de-prioritize (login, account areas). */
  noindex?: boolean;
  /** Defaults to current `location.pathname` + `location.search`. */
  canonicalPath?: string;
  /** Use `title` as the full `<title>` (no ` | Site name` suffix). */
  titleIsFull?: boolean;
  /** Open Graph type; use `article` for posts when needed. */
  ogType?: 'website' | 'article';
};

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage,
  noindex = false,
  canonicalPath,
  titleIsFull = false,
  ogType = 'website',
}: SeoProps) {
  const { pathname, search } = useLocation();
  const path = canonicalPath ?? `${pathname}${search}`;
  const canonical = absoluteUrl(path);

  const docTitle = titleIsFull ? title : `${title} | ${SITE_NAME}`;
  const desc = truncateMeta(description);

  const imageAbsolute = ensureAbsoluteUrl(ogImage ?? undefined);

  return (
    <Helmet prioritizeSeoTags>
      <title>{docTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={docTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      {imageAbsolute && <meta property="og:image" content={imageAbsolute} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={docTitle} />
      <meta name="twitter:description" content={desc} />
      {imageAbsolute && <meta name="twitter:image" content={imageAbsolute} />}
    </Helmet>
  );
}
