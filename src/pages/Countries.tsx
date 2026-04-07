import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { Country } from '../types';
import Spinner from '../components/ui/Spinner';
import Seo from '../components/Seo';
import { Globe } from 'lucide-react';
import CountryCard from '../components/countries/CountryCard';
import CountriesHeader from '../components/countries/CountriesHeader';
import CountriesFilters from '../components/countries/CountriesFilters';
import CountriesPagination from '../components/countries/CountriesPagination';

const COUNTRIES_API = 'https://projects-restapi.vercel.app/api/v1/countries';

const DEFAULT_LIMIT = '20';

/** Fixed API filters (not shown in the browser URL). */
const API_LIST_FILTERS = {
  independent: 'true',
  sort: '-population',
  minPopulation: '10000000',
} as const;

/** Continents supported by the countries API (REST-style names). */
const CONTINENT_OPTIONS = [
  { value: '', label: 'All continents' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'South America', label: 'South America' },
] as const;

type CountriesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

function parsePage(raw: string | null): number {
  const p = parseInt(raw ?? '1', 10);
  return Number.isFinite(p) && p >= 1 ? p : 1;
}

function parseLimit(raw: string | null): number {
  const n = parseInt(raw ?? DEFAULT_LIMIT, 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 100) : 20;
}

/**
 * Browser URL: limit → continent → page → search
 * (e.g. ?limit=20&continent=Asia&page=1&search=mongolia).
 */
function buildListSearchParams(opts: {
  limit?: string;
  page: number;
  search: string;
  continent?: string;
}): URLSearchParams {
  const p = new URLSearchParams();
  p.set('limit', opts.limit ?? DEFAULT_LIMIT);
  const continent = opts.continent?.trim();
  if (continent) p.set('continent', continent);
  p.set('page', String(Math.max(1, opts.page)));
  if (opts.search) p.set('search', opts.search);
  return p;
}

export default function Countries() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get('search') ?? '';
  const continentRaw = searchParams.get('continent')?.trim() ?? '';
  const continentFromUrl = CONTINENT_OPTIONS.some((o) => o.value === continentRaw)
    ? continentRaw
    : '';
  const pageFromUrl = parsePage(searchParams.get('page'));

  const [inputValue, setInputValue] = useState(searchFromUrl);
  const [countries, setCountries] = useState<Country[]>([]);
  const [pagination, setPagination] = useState<CountriesPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    if (id) return;
    if (searchParams.toString() !== '') return;
    setSearchParams(buildListSearchParams({ page: 1, search: '' }), { replace: true });
  }, [id, searchParams, setSearchParams]);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = inputValue.trim();
      if (next === searchFromUrl) return;
      const limit = searchParams.get('limit') ?? DEFAULT_LIMIT;
      const continent = searchParams.get('continent')?.trim() ?? '';
      setSearchParams(
        buildListSearchParams({ limit, page: 1, search: next, continent }),
        { replace: true }
      );
    }, 400);
    return () => clearTimeout(t);
  }, [inputValue, searchFromUrl, searchParams, setSearchParams]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiSearch = searchParams.get('search')?.trim() ?? '';
        const apiPage = parsePage(searchParams.get('page'));
        const apiLimit = parseLimit(searchParams.get('limit'));

        const params = new URLSearchParams({
          ...API_LIST_FILTERS,
          limit: String(apiLimit),
          page: String(apiPage),
        });
        const continent = continentFromUrl;
        if (continent) params.set('continent', continent);
        if (apiSearch) params.set('search', apiSearch);

        const response = await fetch(`${COUNTRIES_API}?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(Array.isArray(data.data) ? data.data : []);
        setPagination(data.pagination ?? null);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch countries';
        setError(message);
        setCountries([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      fetchCountries();
    }
  }, [id, searchParams]);

  const commitSearchToUrl = (e?: React.FormEvent) => {
    e?.preventDefault();
    const next = inputValue.trim();
    const limit = searchParams.get('limit') ?? DEFAULT_LIMIT;
    const continent = searchParams.get('continent')?.trim() ?? '';
    setSearchParams(
      buildListSearchParams({ limit, page: 1, search: next, continent }),
      { replace: true }
    );
  };

  const applyContinent = (continent: string) => {
    const limit = searchParams.get('limit') ?? DEFAULT_LIMIT;
    const search = searchParams.get('search')?.trim() ?? '';
    setSearchParams(
      buildListSearchParams({
        limit,
        page: 1,
        search,
        continent: continent.trim() || undefined,
      }),
      { replace: true }
    );
  };

  if (id) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Seo title="Countries" description="Loading country profiles and facts." />
        <Spinner size="lg" />
        <p className="text-gray-400 font-medium animate-pulse">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center space-y-4">
        <Seo
          title="Countries error"
          description="We could not load the country list. Try again shortly."
        />
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Error Loading Countries</h3>
        <p className="text-gray-500 max-w-md mx-auto">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  const total = pagination?.total ?? countries.length;
  const totalPages = Math.max(1, pagination?.totalPages ?? 1);
  const currentPage = pagination?.page ?? pageFromUrl;
  const showingFrom =
    total === 0 ? 0 : (currentPage - 1) * (pagination?.limit ?? 20) + 1;
  const showingTo = Math.min(
    total,
    (currentPage - 1) * (pagination?.limit ?? 20) + countries.length
  );

  const goToPage = (p: number) => {
    const next = Math.max(1, Math.min(p, totalPages));
    const limit = searchParams.get('limit') ?? DEFAULT_LIMIT;
    const search = searchParams.get('search')?.trim() ?? '';
    const continent = searchParams.get('continent')?.trim() ?? '';
    setSearchParams(
      buildListSearchParams({ limit, page: next, search, continent }),
      { replace: true }
    );
  };

  return (
    <div className="space-y-12">
      <Seo
        title="Countries"
        description="Explore countries around the world: capitals, flags, population, and more. Filter by region and search."
      />
      <CountriesHeader
        total={total}
        showingFrom={showingFrom}
        showingTo={showingTo}
        continent={continentFromUrl}
        search={searchFromUrl}
      />

      <CountriesFilters
        continent={continentFromUrl}
        continentOptions={CONTINENT_OPTIONS}
        onContinentChange={applyContinent}
        searchValue={inputValue}
        onSearchChange={setInputValue}
        onSearchSubmit={commitSearchToUrl}
      />

      {countries.length === 0 ? (
        <div className="py-20 text-center rounded-[32px] border border-dashed border-gray-200 bg-gray-50/80">
          <Globe className="mx-auto text-gray-300 mb-4" size={40} />
          <p className="text-lg font-semibold text-gray-800">No countries match</p>
          <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
            Try another search or go to the previous page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {countries.map((country) => (
            <div key={country._id}>
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      )}

      <CountriesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() =>
          goToPage(pagination?.prevPage != null ? pagination.prevPage : currentPage - 1)
        }
        onNext={() =>
          goToPage(pagination?.nextPage != null ? pagination.nextPage : currentPage + 1)
        }
      />
    </div>
  );
}
