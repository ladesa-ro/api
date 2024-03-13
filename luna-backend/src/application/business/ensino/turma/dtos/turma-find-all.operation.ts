import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { TurmaDto } from './turma.dto';

// ======================================================

@ObjectType('TurmaFindAllResult')
export class TurmaFindAllResultDto extends PaginatedResultDto<Dto.ITurmaFindOneResultDto> implements Dto.ITurmaFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [TurmaDto],
    },
    swagger: {
      type: [TurmaFindAllResultDto],
    },
  })
  data!: Dto.ITurmaFindOneResultDto[];
}

// =============================================================

export const TURMA_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de "turma" cadastrados no sistema.',

  gql: {
    name: 'turmaFindAll',
    returnType: () => TurmaFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: TurmaFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
    ],
  },
});

// ======================================================
