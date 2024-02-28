import { InputType, Int, ObjectType } from '@nestjs/graphql';
import { PaginateQuery } from 'nestjs-paginate';
import * as yup from 'yup';
import { DtoProperty, ValidationContractNumber, ValidationContractString, createDtoPropertyOptions, createValidationContract } from '../../infrastructure';
import { IPaginatedResultDto, IPaginatedResultDtoLinks, IPaginatedResultDtoMeta } from './(dtos)';

// ======================================================================

export const CommonPropertyId = (description: string = 'ID do registro.') =>
  createDtoPropertyOptions({
    nullable: false,
    description: description,

    gql: {
      type: () => Int,
    },

    swagger: {
      type: 'integer',
    },
  });

@InputType('ObjectIdDto')
export class ObjectIdDto {
  @DtoProperty(CommonPropertyId())
  id!: number;
}

// ======================================================================

export const CommonPropertyUuid = (description: string = 'UUID do registro.') =>
  createDtoPropertyOptions({
    nullable: false,
    description: description,

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  });

@InputType('ObjectUuidDto')
export class ObjectUuidDto {
  @DtoProperty(CommonPropertyUuid())
  id!: string;
}

// ==================

@ObjectType('PaginatedResultDtoMeta')
export class PaginatedResultDtoMeta implements IPaginatedResultDtoMeta {
  @DtoProperty(
    createDtoPropertyOptions({
      description: 'Itens por página.',
      nullable: false,
      gql: {
        type: () => Int,
      },
      swagger: {
        type: 'integer',
      },
    }),
  )
  itemsPerPage!: number;

  @DtoProperty(
    createDtoPropertyOptions({
      description: 'Total de itens.',
      nullable: false,
      gql: {
        type: () => Int,
      },
      swagger: {
        type: 'integer',
      },
    }),
  )
  totalItems!: number;

  @DtoProperty(
    createDtoPropertyOptions({
      description: 'Página atual.',
      nullable: false,
      gql: {
        type: () => Int,
      },
      swagger: {
        type: 'integer',
      },
    }),
  )
  currentPage!: number;

  @DtoProperty(
    createDtoPropertyOptions({
      description: 'Total de páginas.',
      nullable: false,
      gql: {
        type: () => Int,
      },
      swagger: {
        type: 'integer',
      },
    }),
  )
  totalPages!: number;

  search!: string;
  sortBy!: [string, 'DESC' | 'ASC'][];
  filter!: Record<string, string | string[]>;
}

@ObjectType()
export abstract class PaginatedResultDto<T> implements IPaginatedResultDto<T> {
  abstract data: T[];

  @DtoProperty({
    description: 'Metadados da busca.',
    nullable: false,
    gql: {
      type: () => PaginatedResultDtoMeta,
    },
    swagger: {
      type: PaginatedResultDtoMeta,
    },
  })
  meta!: IPaginatedResultDtoMeta;

  links!: IPaginatedResultDtoLinks;
}

// ======================================================================

export type IPaginatedOptionsInputDto = {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: string[];
  filters?: Record<string, string | string[]>;
};

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

// ======================================================================
