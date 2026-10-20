/** Estructura de REST Countries v3.1; los datos no disponibles son opcionales o null. */
export interface Country {
  name: { common: string; official?: string | null };
  cca3: string;
  flags?: { svg?: string | null; png?: string | null; alt?: string | null } | null;
  population?: number | null;
  region?: string | null;
  capital?: string[] | null;
  translations?: { spa?: { common: string; official?: string | null } | null } | null;
}

export interface CountryFilters {
  search: string;
  region: string;
}
