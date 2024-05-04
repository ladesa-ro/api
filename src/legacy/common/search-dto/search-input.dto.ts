import * as Spec from '@sisgea/spec';
import { fromPairs, toPairs } from 'lodash';
import { PaginateQuery } from 'nestjs-paginate';

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
