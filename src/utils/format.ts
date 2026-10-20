import type { Country } from '../types/country';

export const regionNames: Readonly<Record<string, string>> = {
  Africa: 'África', Americas: 'América', Asia: 'Asia', Europe: 'Europa', Oceania: 'Oceanía', Antarctic: 'Antártida',
};

export function countryName(country: Country): string {
  return country.translations?.spa?.common.trim() || country.name.common;
}

export function formatPopulation(population: number | null | undefined): string {
  return population == null ? 'No disponible' : new Intl.NumberFormat('es-SV').format(population);
}

export function regionName(region: string | null | undefined): string {
  return region ? (regionNames[region] ?? region) : 'No disponible';
}

export function normalizeText(text: string): string {
  return text.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}
