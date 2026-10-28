import type { KeyboardEvent } from 'react';
import type { NavigationItem } from '../../types/navigation';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Navigation } from '../molecules/Navigation';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}

const navigationItems: readonly NavigationItem[] = [
  { label: 'Países', href: '#paises' },
  { label: 'Buscar y filtrar', href: '#filtros' },
];

export function Header({ isMenuOpen, onMenuToggle, onMenuClose }: HeaderProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (event.key === 'Escape' && isMenuOpen) {
      onMenuClose();
      event.currentTarget.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
    }
  }

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <div className="shell header-inner">
        <a className="brand" href="#inicio" onClick={onMenuClose}><Icon name="globe" /><span>Explorer App</span></a>
        <Button variant="menu" className="menu-toggle" aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMenuOpen} aria-controls="primary-navigation" onClick={onMenuToggle}>
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </Button>
        <Navigation items={navigationItems} isOpen={isMenuOpen} onNavigate={onMenuClose} />
      </div>
    </header>
  );
}
