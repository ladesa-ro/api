import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { DisciplinaDto } from './disciplina.dto';

// ======================================================

@ObjectType('DisciplinaFindAllResult')
export class DisciplinaFindAllResultDto extends PaginatedResultDto<Dto.IDisciplinaFindOneResultDto> implements Dto.IDisciplinaFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [DisciplinaDto],
    },
    swagger: {
      type: [DisciplinaFindAllResultDto],
    },
  })
  data!: Dto.IDisciplinaFindOneResultDto[];
}

// =============================================================

export const DISCIPLINA_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de "disciplina" cadastrados no sistema.',

  gql: {
    name: 'disciplinaFindAll',
    returnType: () => DisciplinaFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: DisciplinaFindAllResultDto,

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
