import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Country } from '../../types';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
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
  );
}
