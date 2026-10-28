import type { Country } from '../types/country';

export function normalizeText(value: string): string {
  return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export function filterCountries(countries: readonly Country[], search: string, region: string): Country[] {
  const normalizedSearch = normalizeText(search);
  return countries.filter((country) => normalizeText(country.name).includes(normalizedSearch) && (!region || country.region === region));
}

export function formatPopulation(value: number | null): string {
  return value === null ? 'No disponible' : new Intl.NumberFormat('es-SV').format(value);
}
