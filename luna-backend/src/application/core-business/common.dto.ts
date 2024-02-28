import { InputType, Int, ObjectType } from '@nestjs/graphql';
import { DtoProperty, createDtoPropertyOptions } from '../../infrastructure';
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
