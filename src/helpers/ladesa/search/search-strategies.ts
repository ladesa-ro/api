import { PaginatedResultLinks, PaginatedResultMeta } from '@ladesa-ro/especificacao';
import { castArray } from 'lodash';
import { PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as yup from 'yup';

export type OperationListInputQueries = {
  page?: string | number;
  search?: string | undefined | null;
  sortBy?: string | string[];
};

export type OperationListInput = {
  queries: OperationListInputQueries;
};

const NestPaginateValidator = yup
  .object({
    page: yup.number().integer().positive().default(1),
    limit: yup.number().integer().positive().default(100).min(1).max(100),

    search: yup.string().default(''),

    sortBy: yup
      .array()
      .of(
        yup
          .array()
          .of(yup.string())
          .transform((value) => {
            if (typeof value === 'string') {
              return value.split(':');
            }

            return value;
          }),
      )
      .transform((value) => {
        if (!Array.isArray(value)) {
          return [value];
        }

        return value;
      })
      .default([]) as any,
    filter: yup.mixed({}),
  })
  .transform((value) => {
    if (value) {
      const allEntries = Object.entries(value);

      const otherEntries = allEntries.filter((entry) => !entry[0].startsWith('filter.'));
      const filterEntries = allEntries.filter((entry) => entry[0].startsWith('filter.'));

      return {
        ...Object.fromEntries(otherEntries),

        filter: filterEntries.reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key.replace('filter.', '')]: Array.isArray(value) ? value : [value],
          };
        }, {}),
      };
    }
  });

export const ConvertOperationListInputParamToNestPaginate = (path: string, input?: OperationListInputQueries): PaginateQuery => {
  return {
    path,
    ...NestPaginateValidator.cast(input),
  };
};

export const LadesaSearch = async <T>(path: string, dto: OperationListInput | null, qb: SelectQueryBuilder<any>, config: PaginateConfig<T>) => {
  const paginateQuery = ConvertOperationListInputParamToNestPaginate(path, dto?.queries);
  return paginate(paginateQuery, qb.clone(), config);
};

export type LadesaPaginatedResult<T> = {
  data: T[];
  links: PaginatedResultLinks;
  meta: PaginatedResultMeta;
};

export const LadesaPaginatedResultDto = <T>(paginated: Paginated<T>): LadesaPaginatedResult<T> => {
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
      last: paginated.links.last ?? null,
      next: paginated.links.next ?? null,
      first: paginated.links.first ?? null,
      current: paginated.links.current ?? null,
      previous: paginated.links.previous ?? null,
    },
  };
};
