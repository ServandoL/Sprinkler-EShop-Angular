export interface Pagination {
  pageSize: number;
  pageNumber: number;
  firstPage: boolean;
  lastPage: boolean;
  currentPage: number;
  totalElements: number;
  totalPages: number;
}
