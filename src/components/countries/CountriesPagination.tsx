import { ChevronLeft, ChevronRight } from 'lucide-react';

type CountriesPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CountriesPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: CountriesPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100"
      aria-label="Countries pagination"
    >
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={18} aria-hidden />
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          Next
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </nav>
  );
}
