import type { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
}

export function Input({ value, onValueChange, className = '', ...props }: InputProps) {
  return <input className={`input ${className}`.trim()} value={value} onChange={(event) => onValueChange(event.currentTarget.value)} {...props} />;
}
