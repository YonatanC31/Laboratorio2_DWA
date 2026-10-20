import type { Country } from '../types/country';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown): boolean {
  return value == null || typeof value === 'string';
}

function isCountry(value: unknown): value is Country {
  if (!isRecord(value) || !isRecord(value.name)) return false;
  if (typeof value.name.common !== 'string' || !value.name.common.trim()) return false;
  if (!optionalString(value.name.official) || typeof value.cca3 !== 'string' || !/^[A-Z]{3}$/.test(value.cca3)) return false;
  if (!optionalString(value.region)) return false;
  if (value.population != null && (typeof value.population !== 'number' || !Number.isFinite(value.population) || value.population < 0)) return false;
  if (value.capital != null && (!Array.isArray(value.capital) || !value.capital.every((item: unknown) => typeof item === 'string'))) return false;
  if (value.flags != null && (!isRecord(value.flags) || !optionalString(value.flags.svg) || !optionalString(value.flags.png) || !optionalString(value.flags.alt))) return false;
  if (value.translations != null) {
    if (!isRecord(value.translations)) return false;
    const spanish = value.translations.spa;
    if (spanish != null && (!isRecord(spanish) || typeof spanish.common !== 'string' || !optionalString(spanish.official))) return false;
  }
  return true;
}

/** El JSON se recibe como unknown y se valida antes de utilizarlo. */
export function parseCountries(data: unknown): Country[] {
  if (!Array.isArray(data) || !data.every(isCountry)) {
    throw new Error('La fuente de datos no tiene el formato de países esperado.');
  }
  return data;
}

export const COUNTRIES_URL = import.meta.env.VITE_COUNTRIES_URL?.trim() || `${import.meta.env.BASE_URL}data/countries.json`;

export async function fetchCountries(url: string = COUNTRIES_URL): Promise<Country[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`No se pudieron obtener los países (HTTP ${response.status}).`);
    const data: unknown = await response.json();
    return parseCountries(data);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('La petición tardó demasiado. Intenta de nuevo.');
    if (error instanceof TypeError) throw new Error('No se pudo conectar con la fuente de datos. Revisa tu conexión e intenta de nuevo.');
    if (error instanceof SyntaxError) throw new Error('La fuente de datos no devolvió un JSON válido.');
    throw error instanceof Error ? error : new Error('Ocurrió un error al obtener los países.');
  } finally {
    clearTimeout(timeout);
  }
}
