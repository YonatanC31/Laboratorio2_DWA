import { describe, expect, it } from 'vitest';
import { demoCountries } from '../data/countries';
import { filterCountries, formatPopulation, normalizeText } from './countries';

describe('utilidades de países', () => {
  it('normaliza mayúsculas, espacios y acentos', () => {
    expect(normalizeText('  MÉXICO ')).toBe('mexico');
  });

  it('evalúa nombre y región al mismo tiempo sin modificar los datos', () => {
    expect(filterCountries(demoCountries, 'JAPON', 'Asia').map((country) => country.code)).toEqual(['JPN']);
    expect(filterCountries(demoCountries, 'JAPON', 'Europe')).toEqual([]);
    expect(demoCountries).toHaveLength(8);
  });

  it('devuelve todos los países cuando no hay filtros', () => {
    expect(filterCountries(demoCountries, '', '')).toHaveLength(8);
  });

  it('formatea la población y diferencia cero de un dato ausente', () => {
    expect(formatPopulation(0)).toBe('0');
    expect(formatPopulation(null)).toBe('No disponible');
    expect(formatPopulation(6486201)).toBe('6,486,201');
  });
});
