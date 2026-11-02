import type { Country } from '../../types/country';
import { formatPopulation, getCapital } from '../../utils/format';
import { Flag } from '../atoms/Flag';
import { CountryFact } from '../atoms/CountryFact';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
}

export function CountryCard({ country, onSelect }: CountryCardProps) {
  return (
    <article className="country-card bg-white dark:bg-slate-800" aria-labelledby={`country-${country.codes.alpha_2}`}>
      <Flag src={country.flag.url_svg} countryName={country.names.common} />
      <div className="card-content">
        <h2 id={`country-${country.codes.alpha_2}`}>{country.names.common}</h2>
        <dl>
          <CountryFact label="Población" value={formatPopulation(country.population)} />
          <CountryFact label="Región" value={<Badge region={country.region} />} />
          <CountryFact label="Capital" value={getCapital(country)} />
        </dl>
        <Button variant="accent" className="select-country" onClick={() => onSelect(country.codes.alpha_2)} aria-label={`Ver más sobre ${country.names.common}`}>Ver más</Button>
      </div>
    </article>
  );
}
