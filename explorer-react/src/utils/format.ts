import type { Country } from '../types/country';

export function formatPopulation(population: number): string {
  return Number.isFinite(population) ? new Intl.NumberFormat('es-SV').format(population) : 'No disponible';
}

export function getCapital(country: Country): string {
  return country.capitals.map((capital) => capital.name.trim()).filter(Boolean).join(', ') || 'No disponible';
}
