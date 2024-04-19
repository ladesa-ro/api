import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteDto } from './ambiente.dto';

// ======================================================

@ObjectType('AmbienteFindAllResult')
export class AmbienteFindAllResultDto extends PaginatedResultDto<Dto.IAmbienteFindOneResultDto> implements Dto.IAmbienteFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [AmbienteDto],
    },
    swagger: {
      type: [AmbienteFindOneResultDto],
    },
  })
  data!: Dto.IAmbienteFindOneResultDto[];
}

// ======================================================

export const AMBIENTE_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todos os ambientes cadastrados no sistema.',

  gql: {
    name: 'ambienteFindAll',
    returnType: () => AmbienteFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: AmbienteFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.bloco.id',
      'filter.bloco.campus.id',
    ],
  },
});

// ======================================================
