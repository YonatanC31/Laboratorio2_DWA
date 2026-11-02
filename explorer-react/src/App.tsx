import { useState } from 'react';
import type { JSX } from 'react';
import type { Country } from './types/country';
import { countriesDemo } from './data/countries-demo';
import { filterCountries } from './utils/filter';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { EmptyState } from './components/molecules/EmptyState';

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const filteredCountries: Country[] = filterCountries(countriesDemo, query, region);

  function handleSelect(code: string): void {
    console.log('País seleccionado:', code);
  }

  function resetFilters(): void {
    setQuery('');
    setRegion('');
  }

  return (
    <div id="inicio" className="app-shell">
      <a className="skip-link" href="#paises">Saltar a los países</a>
      <Header title="Explora los países" query={query} region={region} onQueryChange={setQuery} onRegionChange={setRegion} onReset={resetFilters} isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((open) => !open)} onMenuClose={() => setIsMenuOpen(false)}>
        <p>Consulte sus datos y encuentre países por nombre o región.</p>
      </Header>
      <main className="shell main-content">
        <section id="paises" aria-label="Listado de países">
          <p className="results-count" role="status" aria-live="polite">{filteredCountries.length} {filteredCountries.length === 1 ? 'país encontrado' : 'países encontrados'}</p>
          {filteredCountries.length > 0 ? <CountryGrid countries={filteredCountries} onSelect={handleSelect} /> : <EmptyState onReset={resetFilters} />}
        </section>
      </main>
      <footer className="site-footer shell">Explorer App · Información de países</footer>
    </div>
  );
}
