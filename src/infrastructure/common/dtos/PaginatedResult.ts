import { Int, ObjectType } from '@nestjs/graphql';
import { IPaginatedResultDto, IPaginatedResultDtoLinks, IPaginatedResultDtoMeta } from '@sisgea/spec';
import { DtoProperty, createDtoPropertyOptions } from '../../api-documentate';

@ObjectType('PaginatedResultDtoLegacyMeta')
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

  sortBy!: any;
  filter!: any;
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
