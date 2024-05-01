import { ObjectType } from '@nestjs/graphql';

import * as Dto from '@sisgea/spec';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../infraestrutura';
import { CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';
import { CalendarioLetivoDto } from './calendario-letivo.dto';

//====================================================

@ObjectType('CalendarioLetivoFindAllResult')
export class CalendarioLetivoFindAllResultDto extends PaginatedResultDto<Dto.ICalendarioLetivoFindOneResultDto> implements Dto.ICalendarioLetivoFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [CalendarioLetivoDto],
    },
    swagger: {
      type: [CalendarioLetivoFindOneResultDto],
    },
  })
  data!: Dto.ICalendarioLetivoFindOneResultDto[];
}

//==========================================================================
export const CALENDARIO_LETIVO_FIND_ALL = createDtoOperationOptions({
  description: 'Listagem de calendários letivos cadastrados no sistema.',

  gql: {
    name: 'calendarioLetivoFindAll',
    returnType: () => CalendarioLetivoFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: CalendarioLetivoFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.campus.id',
      'filter.campus.cnpj',
      'filter.campus.razaoSocial',
      'filter.campus.nomeFantasia',
      'filter.modalidade.id',
      'filter.modalidade.nome',
      'filter.modalidade.slug',
    ],
  },
});

// ======================================================
