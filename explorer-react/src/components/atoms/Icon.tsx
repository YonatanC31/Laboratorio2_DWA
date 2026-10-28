interface IconProps {
  name: 'globe' | 'search' | 'menu' | 'close';
}

export function Icon({ name }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'globe' && <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>}
      {name === 'search' && <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>}
      {name === 'menu' && <path d="M4 6h16M4 12h16M4 18h16" />}
      {name === 'close' && <path d="m6 6 12 12M6 18 18 6" />}
    </svg>
  );
}
