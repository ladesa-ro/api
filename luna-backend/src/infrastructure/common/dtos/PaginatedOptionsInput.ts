import { InputType, Int } from '@nestjs/graphql';
import { PaginateQuery } from 'nestjs-paginate';
import * as yup from 'yup';
import { IPaginatedOptionsInputDto } from '../../../application/business/(dtos)';
import { DtoProperty, createDtoPropertyOptions } from '../../api-documentate';
import { createValidationContract, ValidationContractNumber, ValidationContractString } from '../../validation';

@InputType('PaginatedOptionsInput')
export abstract class PaginatedOptionsInputDto implements IPaginatedOptionsInputDto {
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

  filters?: Record<string, string | string[]>;
}

export const PaginateOptionsInputValidationContract = createValidationContract(() => {
  return yup.object({
    page: ValidationContractNumber().integer().positive().nullable().optional(),
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

export const getPaginateQueryByOptionsDto = (dto: IPaginatedOptionsInputDto, path = ''): PaginateQuery => {
  return {
    path: path,
    page: dto.page,
    limit: dto.limit,
    search: dto.search,
    sortBy: dto.sortBy?.map((i) => i.split(':')) as undefined | [string, string][],
  };
};
