import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { createDtoOperationOptions, DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract } from '../../../../infraestrutura';
import { DiarioProfessorFindOneResultDto } from './diario-professor-find-one.operation';
import { DiarioProfessorDto } from './diario-professor.dto';

// ======================================================

@ObjectType('DiarioProfessorFindAllResult')
export class DiarioProfessorFindAllResultDto extends PaginatedResultDto<Dto.IDiarioProfessorFindOneResultDto> implements Dto.IDiarioProfessorFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [DiarioProfessorDto],
    },
    swagger: {
      type: [DiarioProfessorFindOneResultDto],
    },
  })
  data!: Dto.IDiarioProfessorFindOneResultDto[];
}

// =============================================================

export const DIARIO_PROFESSOR_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de vínculos de diário e professor cadastrados no sistema.',

  gql: {
    name: 'diarioProfessorFindAll',
    returnType: () => DiarioProfessorFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: DiarioProfessorFindAllResultDto,

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
