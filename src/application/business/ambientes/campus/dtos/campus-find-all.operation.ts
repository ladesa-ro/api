import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { CampusFindOneResultDto } from './campus-find-one.operation';
import { CampusDto } from './campus.dto';

// =============================================================

@ObjectType('CampusFindAllResult')
export class CampusFindAllResultDto extends PaginatedResultDto<Dto.ICampusFindOneResultDto> implements Dto.ICampusFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [CampusDto],
    },
    swagger: {
      type: [CampusFindOneResultDto],
    },
  })
  data!: Dto.ICampusFindOneResultDto[];
}

// ===================

export const CAMPUS_FIND_ALL = createDtoOperationOptions({
  description: 'Listagem de todos os campi cadastrados no sistema.',

  gql: {
    name: 'campusFindAll',
    returnType: () => CampusFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: CampusFindAllResultDto,
    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.endereco.cidade.id',
      'filter.endereco.cidade.nome',
      'filter.endereco.cidade.estado.id',
      'filter.endereco.cidade.estado.nome',
      'filter.endereco.cidade.estado.sigla',
    ],
  },
});
