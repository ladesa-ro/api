import * as Spec from '@sisgea/spec';
import { castArray, fromPairs, toPairs } from 'lodash';
import { PaginateQuery, Paginated } from 'nestjs-paginate';

export const getPaginateQueryFromSearchInput = (dto?: Spec.ISearchInputDto, path = ''): PaginateQuery => {
  return {
    path: path,
    page: dto?.page,
    limit: dto?.limit,
    search: dto?.search,
    sortBy: dto?.sortBy?.map((i) => i.split(':')) as undefined | [string, string][],
    filter: dto?.filters && fromPairs(dto?.filters),
  };
};

export const getSearchInputFromPaginateQuery = (query: PaginateQuery): Spec.ISearchInputDto => {
  return {
    page: query?.page,
    limit: query?.limit,
    search: query?.search,
    sortBy: query?.sortBy?.map((i) => i.join(':')),
    filters: query?.filter && toPairs(query.filter),
  };
};

export const getPaginatedResultDto = <T>(paginated: Paginated<T>): Spec.IPaginatedResultDto<T> => {
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
