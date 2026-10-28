import type { FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { RegionField } from '../molecules/RegionField';
import { SearchField } from '../molecules/SearchField';

interface FilterBarProps {
  search: string;
  region: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onReset: () => void;
}

export function FilterBar({ search, region, onSearchChange, onRegionChange, onReset }: FilterBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <form id="filtros" className="filter-bar" role="search" aria-label="Buscar y filtrar países" onSubmit={handleSubmit}>
      <SearchField value={search} onSearchChange={onSearchChange} />
      <RegionField value={region} onRegionChange={onRegionChange} />
      <Button variant="secondary" disabled={!search && !region} onClick={onReset}>Limpiar filtros</Button>
    </form>
  );
}
