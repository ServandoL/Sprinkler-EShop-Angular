export interface Pagination {
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  offset: number;
  prevPage: number;
  nextPage: number;
  pagingCounter: number;
}

export interface Page {
  pageNumber: number;
  pageSize: number;
  sort?: string[];
}

export const InitPagination: Pagination = {
  totalDocs: 0,
  limit: 0,
  hasPrevPage: false,
  hasNextPage: false,
  page: 0,
  totalPages: 0,
  offset: 0,
  prevPage: 0,
  nextPage: 0,
  pagingCounter: 0,
};
