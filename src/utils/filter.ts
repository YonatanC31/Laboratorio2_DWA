import type { Country, CountryFilters } from '../types/country';
import { countryName, normalizeText } from './format';

export function filterCountries(countries: readonly Country[], filters: CountryFilters): Country[] {
  const query = normalizeText(filters.search);
  return countries.filter((country) => {
    const matchesName = [countryName(country), country.name.common].some((name) => normalizeText(name).includes(query));
    return matchesName && (!filters.region || country.region === filters.region);
  });
}

export function sortCountries(countries: readonly Country[]): Country[] {
  return [...countries].sort((a, b) => countryName(a).localeCompare(countryName(b), 'es'));
}
