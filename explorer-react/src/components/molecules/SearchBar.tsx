import type { ChangeEvent, JSX } from 'react';
import { Icon } from '../atoms/Icon';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.currentTarget.value);
  }

  return (
    <div className="filter-field search-field">
      <label htmlFor="country-query">Buscar país</label>
      <div className="search-control">
        <Icon name="search" />
        <input id="country-query" className="input" type="search" placeholder="Escriba el nombre de un país" autoComplete="off" value={query} onChange={handleChange} />
      </div>
    </div>
  );
}
