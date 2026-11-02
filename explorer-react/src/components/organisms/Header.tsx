import type { FormEvent, JSX, KeyboardEvent, ReactNode } from 'react';
import type { NavigationItem } from '../../types/navigation';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Navigation } from '../molecules/Navigation';
import { SearchBar } from '../molecules/SearchBar';
import { RegionFilter } from '../molecules/RegionFilter';

interface HeaderProps {
  title: string;
  children: ReactNode;
  query: string;
  region: string;
  onQueryChange: (query: string) => void;
  onRegionChange: (region: string) => void;
  onReset: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}

const navigationItems: readonly NavigationItem[] = [
  { label: 'Países', href: '#paises' },
  { label: 'Buscar y filtrar', href: '#filtros' },
];

export function Header({ title, children, query, region, onQueryChange, onRegionChange, onReset, isMenuOpen, onMenuToggle, onMenuClose }: HeaderProps): JSX.Element {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (event.key === 'Escape' && isMenuOpen) {
      onMenuClose();
      event.currentTarget.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <header onKeyDown={handleKeyDown}>
      <div className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#inicio" onClick={onMenuClose}><Icon name="globe" /><span>Explorer App</span></a>
          <Button variant="menu" className="menu-toggle" aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMenuOpen} aria-controls="primary-navigation" onClick={onMenuToggle}><Icon name={isMenuOpen ? 'close' : 'menu'} /></Button>
          <Navigation items={navigationItems} isOpen={isMenuOpen} onNavigate={onMenuClose} />
        </div>
      </div>
      <div className="shell header-content">
        <div className="page-heading"><h1>{title}</h1><div className="header-description">{children}</div></div>
        <form id="filtros" className="filter-bar" role="search" aria-label="Buscar y filtrar países" onSubmit={handleSubmit}>
          <SearchBar query={query} onQueryChange={onQueryChange} />
          <RegionFilter region={region} onRegionChange={onRegionChange} />
          <Button variant="secondary" disabled={!query && !region} onClick={onReset}>Limpiar filtros</Button>
        </form>
      </div>
    </header>
  );
}
