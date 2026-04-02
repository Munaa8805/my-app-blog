import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Country } from '../types';
import Spinner from '../components/ui/Spinner';
import Input from '../components/ui/Input';
import Seo from '../components/Seo';
import { Search, Globe } from 'lucide-react';

export default function Countries() {
  const { id } = useParams();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://projects-restapi.vercel.app/api/v1/countries',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data.data);
       
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      fetchCountries();
    }
  }, [id]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Seo
        title="Countries"
        description="Explore countries around the world: capitals, flags, population, and more. Search and open any country profile."
      />
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">Countries</h2>
            <span className="text-lg font-medium text-gray-400">
              ({searchQuery ? `${filteredCountries.length} of ${countries.length}` : countries.length})
            </span>
          </div>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Explore information about countries around the world.
          </p>
        </div>
        
        <div className="w-full lg:w-80">
          <Input 
            placeholder="Search countries..."
            icon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="!bg-white border-gray-100 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCountries.map((country) => (
          <Link 
            key={country._id}
            to={`/countries/${country._id}`}
            className="group block bg-white border border-gray-100 rounded-[32px] p-6 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 p-3 sm:p-4">
                <img
                  src={country.flags?.png}
                  alt={country.name.common}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {country.name.common}
                </h3>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <Globe size={14} />
                  <span>{country.capital?.[0] || 'N/A'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {Object.keys(country.currencies || {})[0] || 'N/A'}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                  <Globe size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
