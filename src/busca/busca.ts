import { IPaginatedInputDto, IPaginatedResultDto } from '@sisgea/spec';
import { castArray } from 'lodash';
import { PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';

const getPaginateQueryFromPaginatedInput = (path: string, dto: IPaginatedInputDto | null): PaginateQuery => {
  return {
    path,
    page: dto?.page,
    limit: dto?.limit,
    search: dto?.search,
    sortBy: dto?.sortBy?.map((sortBy): [string, string] => [sortBy.property, sortBy.mode]),
    filter: Object.fromEntries(dto?.filter?.map((filter) => [filter.property, filter.restrictions]) ?? []),
  };
};

export const busca = async <T>(path: string, dto: IPaginatedInputDto | null, qb: SelectQueryBuilder<any>, config: PaginateConfig<T>) => {
  const paginateQuery = getPaginateQueryFromPaginatedInput(path, dto);

  return paginate(paginateQuery, qb.clone(), config);
};

export const getPaginatedResultDto = <T>(paginated: Paginated<T>): IPaginatedResultDto<T> => {
  return {
    ...paginated,
    meta: {
      ...paginated.meta,
      sortBy: (paginated.meta.sortBy ?? [])?.map(([key, value]) => ({ mode: value, property: key })),
      filter: paginated.meta.filter
        ? Object.entries(paginated.meta.filter).map(([key, defs]) => ({
            property: key,
            restrictions: castArray(defs),
          }))
        : [],
    },
    links: {
      first: paginated.links.first ?? null,
      previous: paginated.links.previous ?? null,
      current: paginated.links.current ?? null,
      next: paginated.links.next ?? null,
      last: paginated.links.last ?? null,
    },
  };
};
