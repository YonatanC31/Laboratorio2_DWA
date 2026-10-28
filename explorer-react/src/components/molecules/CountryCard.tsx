import type { Country } from '../../types/country';
import { regionLabels } from '../../data/regions';
import { formatPopulation } from '../../utils/countries';
import { Flag } from '../atoms/Flag';
import { CountryFact } from '../atoms/CountryFact';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="country-card" aria-labelledby={`country-${country.code}`}>
      <Flag file={country.flag} countryName={country.name} />
      <div className="card-content">
        <h2 id={`country-${country.code}`}>{country.name}</h2>
        <dl>
          <CountryFact label="Población" value={formatPopulation(country.population)} />
          <CountryFact label="Región" value={regionLabels[country.region]} />
          <CountryFact label="Capital" value={country.capital?.trim() || 'No disponible'} />
        </dl>
      </div>
    </article>
  );
}
