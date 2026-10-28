import { useState } from 'react';

interface FlagProps {
  file: string;
  countryName: string;
}

export function Flag({ file, countryName }: FlagProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flag-frame">
      {failed
        ? <span className="flag-placeholder">Bandera no disponible</span>
        : <img src={`${import.meta.env.BASE_URL}flags/${file}`} alt={`Bandera de ${countryName}`} width="240" height="140" onError={() => setFailed(true)} />}
    </div>
  );
}
