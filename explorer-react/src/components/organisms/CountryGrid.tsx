import type { Country } from '../../types/country';
import { CountryCard } from '../molecules/CountryCard';
import { EmptyState } from '../molecules/EmptyState';

interface CountryGridProps {
  countries: readonly Country[];
  onReset: () => void;
}

export function CountryGrid({ countries, onReset }: CountryGridProps) {
  return countries.length > 0
    ? <div className="country-grid">{countries.map((country) => <CountryCard key={country.code} country={country} />)}</div>
    : <EmptyState onReset={onReset} />;
}
