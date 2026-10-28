import { Icon } from '../atoms/Icon';
import { Input } from '../atoms/Input';

interface SearchFieldProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export function SearchField({ value, onSearchChange }: SearchFieldProps) {
  return (
    <div className="filter-field search-field">
      <label htmlFor="country-search">Buscar país</label>
      <div className="search-control">
        <Icon name="search" />
        <Input id="country-search" type="search" placeholder="Escriba el nombre de un país" autoComplete="off" value={value} onValueChange={onSearchChange} />
      </div>
    </div>
  );
}
