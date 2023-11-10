export interface PageableResponse<T> {
  content?: T[];
  pageable?: Pageable;
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  size?: number;
  number?: number;
  sort?: any[];
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}

export interface Pageable {
  sort: any[];
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableRequest {
  page?: number;
  size?: number
  sort?: string
}
