export function renderPagination(container: HTMLElement, page: number, totalPages: number, onChange: (page: number) => void): void {
  container.hidden = totalPages <= 1;
  container.replaceChildren();
  if (container.hidden) return;

  function pageButton(label: string, destination: number, disabled: boolean): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener('click', () => {
      onChange(destination);
      const buttons = container.querySelectorAll<HTMLButtonElement>('button');
      const sameButton = label === 'Anterior' ? buttons[0] : buttons[1];
      const fallback = Array.from(buttons).find((item) => !item.disabled);
      (sameButton?.disabled ? fallback : sameButton)?.focus();
    });
    return button;
  }

  const pageNumber = document.createElement('span');
  pageNumber.className = 'page-number';
  pageNumber.textContent = `Página ${page} de ${totalPages}`;
  container.append(pageButton('Anterior', page - 1, page === 1), pageNumber, pageButton('Siguiente', page + 1, page === totalPages));
}
