import { describe, expect, it } from 'vitest';
import { paginate } from '../src/utils/paginate';

describe('paginación', () => {
  const countries = Array.from({ length: 19 }, (_, index) => index + 1);

  it('muestra ocho elementos por página sin modificar la lista original', () => {
    expect(paginate(countries, 1)).toEqual({ items: [1, 2, 3, 4, 5, 6, 7, 8], page: 1, totalPages: 3, total: 19, first: 1, last: 8 });
    expect(paginate(countries, 3)).toEqual({ items: [17, 18, 19], page: 3, totalPages: 3, total: 19, first: 17, last: 19 });
    expect(countries).toHaveLength(19);
  });

  it('mantiene la página dentro de los límites', () => {
    expect(paginate(countries, -1).page).toBe(1);
    expect(paginate(countries, 100).page).toBe(3);
    expect(paginate(countries, Number.NaN).page).toBe(1);
  });

  it('maneja una lista vacía sin índices ni totales negativos', () => {
    expect(paginate([], 10)).toEqual({ items: [], page: 1, totalPages: 1, total: 0, first: 0, last: 0 });
  });

  it('rechaza un tamaño de página inválido', () => {
    expect(() => paginate(countries, 1, 0)).toThrow(RangeError);
  });
});
