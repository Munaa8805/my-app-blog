import React from 'react';
import { Map, Search } from 'lucide-react';
import Input from '../ui/Input';

type ContinentOption = {
  value: string;
  label: string;
};

type CountriesFiltersProps = {
  continent: string;
  continentOptions: readonly ContinentOption[];
  onContinentChange: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
};

export default function CountriesFilters({
  continent,
  continentOptions,
  onContinentChange,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: CountriesFiltersProps) {
  return (
    <div className="rounded-[28px] border border-gray-100 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-4 items-end">
        <div className="space-y-2">
          <label
            htmlFor="continent-filter"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400"
          >
            <Map size={14} aria-hidden />
            Continent
          </label>
          <select
            id="continent-filter"
            value={continent}
            onChange={(e) => onContinentChange(e.target.value)}
            className="w-full rounded-2xl py-4 px-4 outline-none transition-all text-sm font-medium bg-white border border-gray-100 text-black focus:border-black appearance-none cursor-pointer bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            aria-label="Filter by continent"
          >
            {continentOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={onSearchSubmit} className="space-y-2">
          <Input
            type="search"
            name="country-search"
            enterKeyHint="search"
            placeholder="Search by name (e.g. Mongolia, India)..."
            icon={<Search size={18} />}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="!bg-white border-gray-100 shadow-sm"
            aria-label="Search countries"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
