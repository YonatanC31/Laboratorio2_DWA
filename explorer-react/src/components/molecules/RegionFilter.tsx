import type { ChangeEvent, JSX } from 'react';
import { regionOptions } from '../../data/regions';

interface RegionFilterProps {
  region: string;
  onRegionChange: (region: string) => void;
}

export function RegionFilter({ region, onRegionChange }: RegionFilterProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    onRegionChange(event.currentTarget.value);
  }

  return (
    <div className="filter-field region-field">
      <label htmlFor="country-region">Región</label>
      <select id="country-region" className="select" value={region} onChange={handleChange}>
        {regionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}
