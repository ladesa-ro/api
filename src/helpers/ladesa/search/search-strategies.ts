import { PaginateConfig, PaginateQuery, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as yup from 'yup';

export type OperationListInputQueries = {
  page?: string | number;
  search?: string | undefined | null;
  sortBy?: string | string[];
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
      .transform((t) => {
        if (!Array.isArray(t)) {
          return [t];
        }

        return t;
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
    ...NestPaginateValidator.validateSync(input),
  };
};

export const BuscaLadesa = async <T>(path: string, dto: { queries: OperationListInputQueries } | null, qb: SelectQueryBuilder<any>, config: PaginateConfig<T>) => {
  const paginateQuery = ConvertOperationListInputParamToNestPaginate(path, dto?.queries);

  return paginate(paginateQuery, qb.clone(), config);
};
