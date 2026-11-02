import type { Country } from '../../types/country';
import { CountryCard } from '../molecules/CountryCard';

interface CountryGridProps {
  countries: Country[];
  onSelect: (code: string) => void;
}

export function CountryGrid({ countries, onSelect }: CountryGridProps) {
  return <div className="country-grid">{countries.map((country) => <CountryCard key={country.codes.alpha_2} country={country} onSelect={onSelect} />)}</div>;
}
