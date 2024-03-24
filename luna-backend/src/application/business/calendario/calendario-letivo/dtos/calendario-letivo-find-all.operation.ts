import { InputType, ObjectType } from '@nestjs/graphql';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';

import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { CalendarioLetivoDto, CalendarioLetivoDtoProperties, CalendarioLetivoDtoValidationContract } from './calendario-letivo.dto';
import { CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';

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
  description: 'Lista de "curso" cadastrados no sistema.',

  gql: {
    name: 'cursoFindAll',
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
