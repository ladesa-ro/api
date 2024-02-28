import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(dtos)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { CidadeFindOneResultDto } from './cidade-find-one.operation';
import { CidadeDto } from './cidade.dto';

// =============================================================

@ObjectType('CidadeFindAllResult')
export class CidadeFindAllResultDto extends PaginatedResultDto<Dto.ICidadeFindOneResultDto> implements Dto.ICidadeFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [CidadeDto],
    },
    swagger: {
      type: [CidadeFindOneResultDto],
    },
  })
  data!: Dto.ICidadeFindOneResultDto[];
}

// =============================================================

export const CIDADE_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todas as cidades brasileiras cadastradas no sistema.',

  gql: {
    name: 'cidadeFindAll',
    returnType: () => CidadeFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: CidadeFindAllResultDto,
    queries: [
      //
      'search',
      'sortBy',
      'filter.estado.id',
      'filter.estado.nome',
      'filter.estado.sigla',
    ],
  },
});

// =============================================================
