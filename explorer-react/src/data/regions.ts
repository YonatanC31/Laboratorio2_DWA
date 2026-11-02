export const regionLabels: Readonly<Record<string, string>> = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
};

export const regionOptions = [
  { value: '', label: 'Todas las regiones' },
  ...Object.entries(regionLabels).map(([value, label]) => ({ value, label })),
];
