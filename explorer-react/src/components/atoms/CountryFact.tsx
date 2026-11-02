import type { ReactNode } from 'react';

interface CountryFactProps {
  label: string;
  value: ReactNode;
}

export function CountryFact({ label, value }: CountryFactProps) {
  return <div className="country-fact"><dt>{label}</dt><dd>{value}</dd></div>;
}
