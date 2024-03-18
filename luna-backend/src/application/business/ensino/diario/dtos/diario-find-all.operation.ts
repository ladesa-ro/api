import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { DiarioDto } from './diario.dto';

// ======================================================

@ObjectType('DiarioFindAllResult')
export class DiarioFindAllResultDto extends PaginatedResultDto<Dto.IDiarioFindOneResultDto> implements Dto.IDiarioFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [DiarioDto],
    },
    swagger: {
      type: [DiarioFindAllResultDto],
    },
  })
  data!: Dto.IDiarioFindOneResultDto[];
}

// =============================================================

export const DIARIO_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de "diario" cadastrados no sistema.',

  gql: {
    name: 'diarioFindAll',
    returnType: () => DiarioFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: DiarioFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      'filter'
      //
    ],
  },
});

// ======================================================
