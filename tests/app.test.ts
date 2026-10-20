// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { createCountryCard } from '../src/render/countries';

const sample = [
  { name: { common: 'Japan' }, cca3: 'JPN', region: 'Asia' },
  { name: { common: 'El Salvador' }, cca3: 'SLV', region: 'Americas' },
];

const manyCountries = Array.from({ length: 19 }, (_, index) => ({
  name: { common: index === 18 ? 'Último país' : `País ${String(index + 1).padStart(2, '0')}` },
  cca3: `AA${String.fromCharCode(65 + index)}`,
  region: index === 18 ? 'Asia' : 'Americas',
}));

function pageButton(label: string): HTMLButtonElement {
  const button = Array.from(document.querySelectorAll<HTMLButtonElement>('#pagination button')).find((item) => item.textContent === label);
  if (!button) throw new Error(`No se encontró el botón ${label}`);
  return button;
}

async function startApp(response = new Response(JSON.stringify(sample))): Promise<void> {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));
  await import('../src/main');
  await vi.waitFor(() => expect(document.querySelector('#countries')?.getAttribute('aria-busy')).toBe('false'));
}

function search(): HTMLInputElement { return document.querySelector<HTMLInputElement>('#search')!; }
function region(): HTMLSelectElement { return document.querySelector<HTMLSelectElement>('#region')!; }
function input(value: string): void { search().value = value; search().dispatchEvent(new Event('input')); }
function select(value: string): void { region().value = value; region().dispatchEvent(new Event('change')); }

beforeEach(() => {
  vi.resetModules();
  document.documentElement.innerHTML = readFileSync('index.html', 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it('muestra skeleton durante la petición', async () => {
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
  await import('../src/main');
  expect(document.querySelectorAll('.skeleton-card')).toHaveLength(8);
  expect(search().disabled).toBe(true);
  expect(document.querySelector('#countries')?.getAttribute('aria-busy')).toBe('true');
  vi.clearAllTimers();
});

it('aplica debounce, región inmediata y conserva ambos filtros al cambiar uno', async () => {
  await startApp();
  vi.useFakeTimers();
  input('Japan');
  vi.advanceTimersByTime(299);
  expect(document.querySelectorAll('.country-card')).toHaveLength(2);
  vi.advanceTimersByTime(1);
  expect(document.querySelectorAll('.country-card')).toHaveLength(1);
  select('Americas');
  expect(document.querySelector('.state-panel')).not.toBeNull();
  expect(search().value).toBe('Japan');
  input(''); vi.advanceTimersByTime(300);
  expect(region().value).toBe('Americas');
  expect(document.querySelector('.country-card h2')?.textContent).toBe('El Salvador');
  input('Japan');
  select('');
  expect(search().value).toBe('Japan');
  expect(document.querySelector('.country-card h2')?.textContent).toBe('Japan');
});

it('restablece los filtros desde el estado vacío', async () => {
  await startApp();
  vi.useFakeTimers();
  select('Asia'); input('zzzz'); vi.advanceTimersByTime(300);
  document.querySelector<HTMLButtonElement>('.action-button')?.click();
  expect(search().value).toBe(''); expect(region().value).toBe('');
  expect(document.querySelectorAll('.country-card')).toHaveLength(2);
});

it('muestra error y permite reintentar la carga', async () => {
  await startApp(new Response('', { status: 500 }));
  expect(document.querySelector('[role="alert"]')?.textContent).toContain('HTTP 500');
  vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify(sample)));
  document.querySelector<HTMLButtonElement>('.action-button')?.click();
  await vi.waitFor(() => expect(document.querySelectorAll('.country-card')).toHaveLength(2));
  expect(search().disabled).toBe(false);
});

it('renderiza campos ausentes sin mostrar null o undefined y evita interpretar HTML', () => {
  const card = createCountryCard({ name: { common: '<img src=x onerror=alert(1)>' }, cca3: 'TST', flags: { svg: 'javascript:alert(1)' }, population: null }, 0);
  expect(card.querySelector('h2')?.textContent).toBe('<img src=x onerror=alert(1)>');
  expect(card.querySelector('img')).toBeNull();
  expect(card.textContent).toContain('No disponible');
  expect(card.textContent).not.toMatch(/undefined|null/);
});

it('muestra ocho países por página y respeta los extremos sin nuevas peticiones', async () => {
  await startApp(new Response(JSON.stringify(manyCountries)));
  expect(document.querySelectorAll('.country-card')).toHaveLength(8);
  expect(document.querySelector('#results-count')?.textContent).toBe('Mostrando 1–8 de 19 países');
  expect(pageButton('Anterior').disabled).toBe(true);
  pageButton('Siguiente').click();
  expect(document.querySelector('#results-count')?.textContent).toBe('Mostrando 9–16 de 19 países');
  pageButton('Siguiente').click();
  expect(document.querySelectorAll('.country-card')).toHaveLength(3);
  expect(pageButton('Siguiente').disabled).toBe(true);
  pageButton('Anterior').click();
  expect(document.querySelectorAll('.country-card')).toHaveLength(8);
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('busca entre todos los países y no solo los de la página visible', async () => {
  await startApp(new Response(JSON.stringify(manyCountries)));
  vi.useFakeTimers();
  input('ultimo');
  vi.advanceTimersByTime(300);
  expect(document.querySelectorAll('.country-card')).toHaveLength(1);
  expect(document.querySelector('.country-card h2')?.textContent).toBe('Último país');
  expect(document.querySelector<HTMLElement>('#pagination')?.hidden).toBe(true);
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('vuelve a la primera página al cambiar la región y conserva el filtro al paginar', async () => {
  await startApp(new Response(JSON.stringify(manyCountries)));
  pageButton('Siguiente').click();
  select('Americas');
  expect(document.querySelector('#results-count')?.textContent).toBe('Mostrando 1–8 de 18 países');
  pageButton('Siguiente').click();
  expect(region().value).toBe('Americas');
  expect(document.querySelector('#results-count')?.textContent).toBe('Mostrando 9–16 de 18 países');
  select('Asia');
  expect(document.querySelector('.country-card h2')?.textContent).toBe('Último país');
  expect(document.querySelector<HTMLElement>('#pagination')?.hidden).toBe(true);
});

it('mantiene los 300 ms al cambiar de página mientras se escribe', async () => {
  await startApp(new Response(JSON.stringify(manyCountries)));
  vi.useFakeTimers();
  input('ultimo');
  vi.advanceTimersByTime(299);
  pageButton('Siguiente').click();
  expect(document.querySelectorAll('.country-card')).toHaveLength(8);
  vi.advanceTimersByTime(1);
  expect(document.querySelectorAll('.country-card')).toHaveLength(1);
  expect(document.querySelector('.country-card h2')?.textContent).toBe('Último país');
});

it('distingue una fuente vacía del error y oculta la paginación', async () => {
  await startApp(new Response('[]'));
  expect(document.querySelector('.state-panel h2')?.textContent).toBe('No hay países disponibles');
  expect(document.querySelector('[role="alert"]')).toBeNull();
  expect(document.querySelector<HTMLElement>('#pagination')?.hidden).toBe(true);
});
