interface CountryFactProps {
  label: string;
  value: string;
}

export function CountryFact({ label, value }: CountryFactProps) {
  return <div className="country-fact"><dt>{label}</dt><dd>{value}</dd></div>;
}
