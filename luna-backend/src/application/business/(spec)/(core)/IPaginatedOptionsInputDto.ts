export type IPaginatedOptionsInputDto = {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: string[];
  filters?: Record<string, string | string[]>;
};
