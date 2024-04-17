import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoDto } from './bloco.dto';

// ======================================================

@ObjectType('BlocoFindAllResult')
export class BlocoFindAllResultDto extends PaginatedResultDto<Dto.IBlocoFindOneResultDto> implements Dto.IBlocoFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [BlocoDto],
    },
    swagger: {
      type: [BlocoFindOneResultDto],
    },
  })
  data!: Dto.IBlocoFindOneResultDto[];
}

// =============================================================

export const BLOCO_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todos os blocos cadastrados no sistema.',

  gql: {
    name: 'blocoFindAll',
    returnType: () => BlocoFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: BlocoFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.campus.id',
    ],
  },
});

// ======================================================
