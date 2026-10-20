import type { PaginatedResult } from '../types/pagination';

export const PAGE_SIZE = 8;

export function paginate<T>(items: readonly T[], requestedPage: number, pageSize = PAGE_SIZE): PaginatedResult<T> {
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new RangeError('El tamaño de página debe ser un entero positivo.');
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(totalPages, Math.max(1, Math.trunc(requestedPage) || 1));
  const offset = (page - 1) * pageSize;
  return {
    items: items.slice(offset, offset + pageSize),
    page,
    totalPages,
    total,
    first: total ? offset + 1 : 0,
    last: Math.min(offset + pageSize, total),
  };
}
