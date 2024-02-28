import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(dtos)';
import { PaginateOptionsInputValidationContract, PaginatedOptionsInputDto, PaginatedResultDto } from '../../../../../infrastructure';
import { createDtoOperationOptions } from '../../../../../infrastructure/api-documentate/DtoOperation';
import { DtoProperty } from '../../../../../infrastructure/api-documentate/DtoProperty';
import { EstadoFindOneResultDto } from './estado-find-one.operation';
import { EstadoDto } from './estado.dto';

// =============================================================

@ObjectType('EstadoFindAllResult')
export class EstadoFindAllResultDto extends PaginatedResultDto<Dto.IEstadoFindOneResultDto> implements Dto.IEstadoFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [EstadoDto],
    },
    swagger: {
      type: [EstadoFindOneResultDto],
    },
  })
  data!: Dto.IEstadoFindOneResultDto[];
}

// =============================================================

export const ESTADO_FIND_ALL = createDtoOperationOptions({
  description: 'Listagem de todos os estados brasileiros cadastrados no sistema.',

  gql: {
    name: 'estadoFindAll',
    returnType: () => EstadoFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => PaginatedOptionsInputDto,
    inputDtoValidationContract: PaginateOptionsInputValidationContract,
  },

  swagger: {
    returnType: EstadoFindAllResultDto,
    queries: ['search', 'sortBy'],
  },
});

// ======================================================
