export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
  first: number;
  last: number;
}
