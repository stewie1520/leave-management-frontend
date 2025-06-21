export interface PaginationResponse<T> {
  totalPage: number;
  currentPage: number;
  take: number;
  skip: number;
  items: T[];
}
