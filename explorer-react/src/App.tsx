import { useState } from 'react';
import { demoCountries } from './data/countries';
import { filterCountries } from './utils/countries';
import { Header } from './components/organisms/Header';
import { FilterBar } from './components/organisms/FilterBar';
import { CountryGrid } from './components/organisms/CountryGrid';

export default function App() {
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const visibleCountries = filterCountries(demoCountries, search, region);

  function resetFilters(): void {
    setSearch('');
    setRegion('');
  }

  return (
    <>
      <a className="skip-link" href="#paises">Saltar a los países</a>
      <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((open) => !open)} onMenuClose={() => setIsMenuOpen(false)} />
      <main id="inicio" className="shell main-content">
        <div className="page-heading">
          <h1>Explora los países</h1>
          <p>Consulte sus datos y encuentre países por nombre o región.</p>
        </div>
        <FilterBar search={search} region={region} onSearchChange={setSearch} onRegionChange={setRegion} onReset={resetFilters} />
        <section id="paises" aria-label="Listado de países">
          <p className="results-count" role="status" aria-live="polite">{visibleCountries.length} {visibleCountries.length === 1 ? 'país encontrado' : 'países encontrados'}</p>
          <CountryGrid countries={visibleCountries} onReset={resetFilters} />
        </section>
      </main>
      <footer className="site-footer shell">Explorer App · Información de países</footer>
    </>
  );
}
