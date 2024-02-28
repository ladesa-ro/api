export type ISearchInputDto = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string[];
  filters?: [string, string | string[]][];
};
