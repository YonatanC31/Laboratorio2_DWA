import type { Country } from '../types/country';
import { countryName, formatPopulation, regionName } from '../utils/format';

function fact(label: string, value: string): HTMLElement {
  const row = document.createElement('div');
  const term = document.createElement('dt');
  const description = document.createElement('dd');
  term.textContent = label;
  description.textContent = value;
  row.append(term, description);
  return row;
}

function safeImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value, location.href);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function createCountryCard(country: Country, index: number): HTMLElement {
  const card = document.createElement('article');
  card.className = 'country-card';
  const flag = document.createElement('div');
  flag.className = 'flag-frame';
  const source = safeImageUrl(country.flags?.svg) || safeImageUrl(country.flags?.png);
  const placeholder = (): void => { flag.classList.add('flag-missing'); flag.textContent = 'Bandera no disponible'; };
  if (source) {
    const image = document.createElement('img');
    image.src = source;
    image.alt = country.flags?.alt?.trim() || `Bandera de ${countryName(country)}`;
    image.loading = index < 8 ? 'eager' : 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', placeholder, { once: true });
    flag.append(image);
  } else { placeholder(); }
  const content = document.createElement('div');
  content.className = 'card-content';
  const heading = document.createElement('h2');
  heading.textContent = countryName(country);
  const details = document.createElement('dl');
  details.append(
    fact('Población', formatPopulation(country.population)),
    fact('Región', regionName(country.region)),
    fact('Capital', country.capital?.filter((capital) => capital.trim()).join(', ') || 'No disponible'),
  );
  content.append(heading, details);
  card.append(flag, content);
  return card;
}

export function renderCountries(container: HTMLElement, countries: readonly Country[]): void {
  const grid = document.createElement('div');
  grid.className = 'country-grid';
  grid.append(...countries.map(createCountryCard));
  container.replaceChildren(grid);
}
