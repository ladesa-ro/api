import { InputType, Int } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { castArray, fromPairs, toPairs } from 'lodash';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import * as yup from 'yup';
import { createDtoPropertyOptions, DtoProperty } from '../../api-documentate';
import { createValidationContract, ValidationContractNumber, ValidationContractString } from '../../../validacao';

@InputType('SearchInput')
export abstract class SearchInputDto implements Spec.ISearchInputDto {
  @DtoProperty(
    createDtoPropertyOptions({
      required: false,
      description: 'Limitar a quantidade de resultados por página.',
      nullable: false,
      gql: {
        type: () => Int,
      },
      swagger: {
        type: 'integer',
      },
    }),
  )
  limit?: number;

  @DtoProperty(
    createDtoPropertyOptions({
      required: false,
      description: 'Definir a página de consulta.',
      nullable: false,
      gql: {
        type: () => Int,
      },
      swagger: {
        type: 'integer',
      },
    }),
  )
  page?: number;

  @DtoProperty(
    createDtoPropertyOptions({
      required: false,
      description: 'Busca textual.',
      nullable: false,
      gql: {
        type: () => String,
      },
      swagger: {
        type: 'string',
      },
    }),
  )
  search?: string;

  @DtoProperty(
    createDtoPropertyOptions({
      required: false,
      description: 'Ordenação.',
      nullable: false,
      gql: {
        type: () => [String],
      },
      swagger: {
        type: 'string',
        isArray: true,
      },
    }),
  )
  sortBy?: string[];

  //
  filters?: [string, string][];
}

export const SearchInputValidationContract = createValidationContract(() => {
  return yup.object({
    page: ValidationContractNumber().integer().positive().nullable().optional().default(1),

    limit: ValidationContractNumber().integer().positive().nullable().optional(),
    search: ValidationContractString().nullable().optional(),

    sortBy: yup
      .array(
        ValidationContractString()
          .nonNullable()
          .required()
          .matches(/^[\D]+:(ASC|DESC)$/),
      )
      .nullable()
      .optional(),
  });
});

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
