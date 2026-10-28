import { regionOptions } from '../../data/regions';
import { Select } from '../atoms/Select';

interface RegionFieldProps {
  value: string;
  onRegionChange: (value: string) => void;
}

export function RegionField({ value, onRegionChange }: RegionFieldProps) {
  return (
    <div className="filter-field region-field">
      <label htmlFor="country-region">Región</label>
      <Select id="country-region" value={value} options={regionOptions} onValueChange={onRegionChange} />
    </div>
  );
}
