import type { Country } from '../types/country';

export function normalizeText(value: string): string {
  return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export function filterCountries(countries: readonly Country[], query: string, region: string): Country[] {
  const search = normalizeText(query);
  return countries.filter((country) => normalizeText(country.names.common).includes(search) && (!region || country.region === region));
}
