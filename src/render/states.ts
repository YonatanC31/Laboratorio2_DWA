function statePanel(title: string, description: string, actionLabel?: string, onAction?: () => void): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'state-panel';
  const heading = document.createElement('h2');
  heading.textContent = title;
  const text = document.createElement('p');
  text.textContent = description;
  panel.append(heading, text);
  if (actionLabel && onAction) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'action-button';
    button.textContent = actionLabel;
    button.addEventListener('click', onAction);
    panel.append(button);
  }
  return panel;
}

export function renderLoading(container: HTMLElement): void {
  const grid = document.createElement('div');
  grid.className = 'country-grid';
  grid.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 8; index++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = '<div class="skeleton-flag"></div><div class="skeleton-body"><div></div><div></div><div></div></div>';
    grid.append(card);
  }
  container.replaceChildren(grid);
}

export function renderEmpty(container: HTMLElement, hasCountries: boolean, onReset: () => void): void {
  container.replaceChildren(hasCountries
    ? statePanel('No se encontraron países', 'Prueba con otro nombre o selecciona una región diferente.', 'Restablecer filtros', onReset)
    : statePanel('No hay países disponibles', 'La fuente de datos devolvió una lista vacía.'));
}

export function renderError(container: HTMLElement, error: Error, onRetry: () => void): void {
  const panel = statePanel('No se pudieron cargar los países', error.message, 'Volver a intentar', onRetry);
  panel.setAttribute('role', 'alert');
  container.replaceChildren(panel);
}
