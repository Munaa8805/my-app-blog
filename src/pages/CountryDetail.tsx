import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Country } from '../types';
import { ArrowLeft, Globe, MapPin, Users, Languages, Landmark, Maximize, Map, Link as LinkIcon } from 'lucide-react';
import Spinner from '../components/ui/Spinner';

export default function CountryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://projects-restapi.vercel.app/api/v1/countries');
       
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        const foundCountry = data.find((c: Country) => c.name.common === name);
        if (!foundCountry) {
          throw new Error('Country not found');
        }
        setCountry(foundCountry);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchCountry();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Spinner size="lg" />
        <p className="text-gray-400 font-medium animate-pulse">Loading country details...</p>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Country not found</h2>
        <button 
          onClick={() => navigate('/countries')}
          className="text-black underline font-medium"
        >
          Back to countries
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <button 
        onClick={() => navigate('/countries')}
        className="flex items-center space-x-2 text-sm text-gray-500 hover:text-black transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to countries</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="aspect-[16/10] bg-gray-50 rounded-[48px] overflow-hidden shadow-2xl shadow-black/5">
            <img 
              src={country.flags?.svg} 
              alt={country.name.common} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Users size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Population</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {country.population?.toLocaleString()}
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Maximize size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Area</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {country.area?.toLocaleString()} <span className="text-sm font-normal text-gray-400">km²</span>
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-[32px] p-6 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Map size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Continents</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {country.continents?.join(', ')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {country.independent && (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Independent
                </span>
              )}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              {country.name.common}
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Official Name: {country.name.official}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-900">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold">Capital</h3>
              </div>
              <p className="text-gray-500 pl-13">{country.capital?.[0] || 'N/A'}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-900">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Landmark size={20} />
                </div>
                <h3 className="font-bold">Currencies</h3>
              </div>
              <div className="pl-13 space-y-1">
                {Object.values(country.currencies || {}).map((curr: any, idx) => (
                  <p key={idx} className="text-gray-500">
                    {curr.name} ({curr.symbol})
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-900">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Languages size={20} />
                </div>
                <h3 className="font-bold">Languages</h3>
              </div>
              <p className="text-gray-500 pl-13">
                {Object.values(country.languages || {}).join(', ')}
              </p>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-900">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Globe size={20} />
                  </div>
                  <h3 className="font-bold">Borders</h3>
                </div>
                <p className="text-gray-500 pl-13">
                  {country.borders.join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-gray-100">
            <button 
              onClick={() => navigate('/countries')}
              className="px-8 py-4 bg-black text-white rounded-[24px] font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              Explore More Countries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
