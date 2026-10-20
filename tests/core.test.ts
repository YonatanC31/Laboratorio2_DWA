import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { fetchCountries, parseCountries } from '../src/api/countries';
import type { Country } from '../src/types/country';
import { debounce } from '../src/utils/debounce';
import { filterCountries, sortCountries } from '../src/utils/filter';
import { formatPopulation } from '../src/utils/format';

const sample: Country[] = [
  { name: { common: 'Japan' }, translations: { spa: { common: 'Japón' } }, cca3: 'JPN', population: 125836021, region: 'Asia', capital: ['Tokyo'] },
  { name: { common: 'El Salvador' }, cca3: 'SLV', population: 6486201, region: 'Americas', capital: ['San Salvador'] },
  { name: { common: 'Germany' }, translations: { spa: { common: 'Alemania' } }, cca3: 'DEU', region: 'Europe' },
];

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('validación y petición', () => {
  it('valida los 250 países del archivo entregado', () => {
    const json: unknown = JSON.parse(readFileSync('public/data/countries.json', 'utf8'));
    expect(parseCountries(json)).toHaveLength(250);
  });
  it('acepta campos ausentes y null, pero rechaza estructuras inválidas', () => {
    expect(parseCountries([{ name: { common: 'Prueba' }, cca3: 'TST', population: null, capital: null, flags: null, region: null }])).toHaveLength(1);
    for (const data of [{ success: false }, null, [null], [{ ...sample[0], population: '100' }], [{ ...sample[0], capital: [2] }], [{ ...sample[0], flags: { png: 3 } }], [{ ...sample[0], translations: { spa: { common: 8 } } }]]) {
      expect(() => parseCountries(data)).toThrow('formato');
    }
  });
  it('devuelve países con retorno tipado', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(sample))));
    expect(await fetchCountries('/countries.json')).toEqual(sample);
  });
  it('distingue un HTTP fallido de una lista vacía', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response('', { status: 503 })).mockResolvedValueOnce(new Response('[]')));
    await expect(fetchCountries()).rejects.toThrow('HTTP 503');
    expect(await fetchCountries()).toEqual([]);
  });
  it('informa JSON inválido y errores de conexión', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response('<html>')).mockRejectedValueOnce(new TypeError('Network error')));
    await expect(fetchCountries()).rejects.toThrow('JSON válido');
    await expect(fetchCountries()).rejects.toThrow('conexión');
  });
  it('interrumpe una petición que supera los 15 segundos', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn((_url: string, options: RequestInit) => new Promise((_resolve, reject) => {
      options.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })));
    const result = expect(fetchCountries()).rejects.toThrow('tardó demasiado');
    await vi.advanceTimersByTimeAsync(15_000);
    await result;
  });
});

describe('filtros y formato', () => {
  it('combina nombre y región sin distinguir mayúsculas ni acentos', () => {
    expect(filterCountries(sample, { search: ' JAPon ', region: 'Asia' })).toEqual([sample[0]]);
    expect(filterCountries(sample, { search: 'japan', region: 'Europe' })).toEqual([]);
    expect(filterCountries(sample, { search: '', region: 'Americas' })).toEqual([sample[1]]);
    expect(filterCountries(sample, { search: 'japan', region: '' })).toEqual([sample[0]]);
  });
  it('ordena los nombres en español sin mutar el original', () => {
    expect(sortCountries(sample).map((country) => country.cca3)).toEqual(['DEU', 'SLV', 'JPN']);
    expect(sample[0]?.cca3).toBe('JPN');
  });
  it('mantiene cero como población válida y contempla ausencias', () => {
    expect(formatPopulation(0)).toBe('0');
    expect(formatPopulation(null)).toBe('No disponible');
    expect(formatPopulation(undefined)).toBe('No disponible');
  });
});

describe('debounce', () => {
  it('reinicia los 300 ms con cada entrada y usa el último valor', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const delayed = debounce(callback, 300);
    delayed('j');
    vi.advanceTimersByTime(200);
    delayed('japon');
    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledExactlyOnceWith('japon');
  });
  it('cancela actualizaciones pendientes', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const delayed = debounce(callback);
    delayed(); delayed.cancel();
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
  });
});
