import { fetchCountries } from './api/countries';
import type { Country, CountryFilters } from './types/country';
import { debounce } from './utils/debounce';
import { filterCountries, sortCountries } from './utils/filter';
import { paginate } from './utils/paginate';
import { renderCountries } from './render/countries';
import { renderPagination } from './render/pagination';
import { renderEmpty, renderError, renderLoading } from './render/states';

function element<T extends HTMLElement>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) throw new Error(`No se encontró el elemento ${selector}.`);
  return node;
}

const search = element<HTMLInputElement>('#search');
const region = element<HTMLSelectElement>('#region');
const container = element('#countries');
const count = element('#results-count');
const form = element<HTMLFormElement>('#filters');
const pagination = element('#pagination');
let countries: Country[] = [];
let filters: CountryFilters = { search: '', region: '' };
let currentPage = 1;
let status: 'loading' | 'ready' | 'error' = 'loading';

function updateResults(): void {
  if (status !== 'ready') return;
  const filtered = filterCountries(countries, filters);
  const result = paginate(filtered, currentPage);
  currentPage = result.page;
  count.textContent = result.total
    ? `Mostrando ${result.first}–${result.last} de ${result.total} ${result.total === 1 ? 'país' : 'países'}`
    : 'No hay países para mostrar';
  if (result.total) renderCountries(container, result.items);
  else renderEmpty(container, countries.length > 0, resetFilters);
  renderPagination(pagination, result.page, result.totalPages, (page) => {
    currentPage = page;
    updateResults();
  });
}

function applyFilters(): void {
  filters = { search: search.value, region: region.value };
  currentPage = 1;
  updateResults();
}

const delayedSearch = debounce(applyFilters, 300);

function resetFilters(): void {
  delayedSearch.cancel();
  search.value = '';
  region.value = '';
  applyFilters();
  search.focus();
}

async function loadCountries(): Promise<void> {
  status = 'loading';
  delayedSearch.cancel();
  container.setAttribute('aria-busy', 'true');
  pagination.hidden = true;
  count.textContent = 'Cargando países…';
  search.disabled = true;
  region.disabled = true;
  renderLoading(container);
  try {
    countries = sortCountries(await fetchCountries());
    status = 'ready';
    applyFilters();
  } catch (error: unknown) {
    status = 'error';
    count.textContent = 'No fue posible cargar los países';
    renderError(container, error instanceof Error ? error : new Error('Ocurrió un error inesperado.'), () => { void loadCountries(); });
  } finally {
    container.setAttribute('aria-busy', 'false');
    search.disabled = status !== 'ready';
    region.disabled = status !== 'ready';
  }
}

search.addEventListener('input', () => delayedSearch());
region.addEventListener('change', () => { delayedSearch.cancel(); applyFilters(); });
form.addEventListener('submit', (event) => { event.preventDefault(); });

void loadCountries();
