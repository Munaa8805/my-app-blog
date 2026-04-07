type CountriesHeaderProps = {
  total: number;
  showingFrom: number;
  showingTo: number;
  continent: string;
  search: string;
};

export default function CountriesHeader({
  total,
  showingFrom,
  showingTo,
  continent,
  search,
}: CountriesHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-4 flex-wrap">
        <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">Countries</h2>
        <span className="text-lg font-medium text-gray-400">
          ({total} {total === 1 ? 'country' : 'countries'})
        </span>
      </div>
      <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
        Explore information about countries around the world.
      </p>
      <p className="text-sm text-gray-400 max-w-2xl">
        Independent countries, population ≥ 10M, sorted by population (highest first).
        {continent ? (
          <span className="font-medium text-gray-600"> Continent: {continent}.</span>
        ) : (
          <span> All continents.</span>
        )}{' '}
        {total > 0 && (
          <span>
            Results {showingFrom}–{showingTo} of {total}.
          </span>
        )}
        {search ? (
          <span className="block mt-1 text-gray-500">
            Search: <span className="font-medium text-gray-800">{search}</span>
          </span>
        ) : null}
      </p>
    </div>
  );
}
