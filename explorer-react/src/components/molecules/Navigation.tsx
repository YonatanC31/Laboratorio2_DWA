import type { NavigationItem } from '../../types/navigation';

interface NavigationProps {
  items: readonly NavigationItem[];
  isOpen: boolean;
  onNavigate: () => void;
}

export function Navigation({ items, isOpen, onNavigate }: NavigationProps) {
  return (
    <nav id="primary-navigation" aria-label="Navegación principal" className={`navigation${isOpen ? ' is-open' : ''}`}>
      {items.map((item) => <a key={item.href} href={item.href} onClick={onNavigate}>{item.label}</a>)}
    </nav>
  );
}
