export type IPaginatedResultDtoMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  search: string;
  sortBy: [string, 'DESC' | 'ASC'][];
  filter: Record<string, string | string[]>;
};

export type IPaginatedResultDtoLinks = {
  first: string;
  previous: string;
  current: string;
  next: string;
  last: string;
};

export type IPaginatedResultDto<T> = {
  data: T[];
  meta: IPaginatedResultDtoMeta;
  links: IPaginatedResultDtoLinks;
};
