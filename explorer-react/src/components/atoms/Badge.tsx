import type { JSX } from 'react';
import { regionLabels } from '../../data/regions';

interface BadgeProps {
  region: string;
}

export function Badge({ region }: BadgeProps): JSX.Element {
  return <span className="region-badge inline-flex rounded px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200">{regionLabels[region] ?? (region || 'No disponible')}</span>;
}
