import { Button } from '../atoms/Button';

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2>No se encontraron países</h2>
      <p>Pruebe con otro nombre o seleccione una región diferente.</p>
      <Button onClick={onReset}>Restablecer filtros</Button>
    </div>
  );
}
