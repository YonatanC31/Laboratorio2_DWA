import { describe, expect, it } from 'vitest';
import { countriesDemo, elSalvador } from '../data/countries-demo';
import { filterCountries, normalizeText } from './filter';
import { formatPopulation, getCapital } from './format';

describe('datos, filtros y formato', () => {
  it('mantiene los tres registros y códigos únicos del material de clase', () => {
    expect(countriesDemo.map((country) => country.names.common)).toEqual(['El Salvador', 'Japan', 'Canada']);
    expect(countriesDemo.map((country) => country.codes.alpha_2)).toEqual(['SV', 'JP', 'CA']);
    expect(new Set(countriesDemo.map((country) => country.codes.alpha_2)).size).toBe(3);
  });
  it('filtra desde la colección original sin modificarla', () => {
    const original = JSON.stringify(countriesDemo);
    expect(filterCountries(countriesDemo, 'can', 'Americas').map((country) => country.codes.alpha_2)).toEqual(['CA']);
    expect(filterCountries(countriesDemo, 'can', 'Asia')).toEqual([]);
    expect(JSON.stringify(countriesDemo)).toBe(original);
  });
  it('normaliza espacios, mayúsculas y acentos', () => {
    expect(normalizeText('  SALVÁDOR ')).toBe('salvador');
    expect(filterCountries(countriesDemo, 'SAL', '')).toEqual([elSalvador]);
  });
  it('formatea población y capital sin perder el cero', () => {
    expect(formatPopulation(6029976)).toBe('6,029,976');
    expect(formatPopulation(0)).toBe('0');
    expect(getCapital(elSalvador)).toBe('San Salvador');
    expect(getCapital({ ...elSalvador, capitals: [] })).toBe('No disponible');
  });
});
