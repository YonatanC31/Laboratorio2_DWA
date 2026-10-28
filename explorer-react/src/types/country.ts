export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export interface Country {
  code: string;
  name: string;
  flag: string;
  population: number | null;
  region: Region;
  capital: string | null;
}
