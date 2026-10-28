import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'children'> {
  value: string;
  options: readonly SelectOption[];
  onValueChange: (value: string) => void;
}

export function Select({ value, options, onValueChange, className = '', ...props }: SelectProps) {
  return (
    <select className={`select ${className}`.trim()} value={value} onChange={(event) => onValueChange(event.currentTarget.value)} {...props}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}
