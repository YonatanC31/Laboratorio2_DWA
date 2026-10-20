export interface DebouncedFunction<Args extends unknown[]> {
  (...args: Args): void;
  cancel: () => void;
}

export function debounce<Args extends unknown[]>(callback: (...args: Args) => void, delay = 300): DebouncedFunction<Args> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: Args): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => { timeout = undefined; callback(...args); }, delay);
  };
  debounced.cancel = () => { clearTimeout(timeout); timeout = undefined; };
  return debounced;
}
