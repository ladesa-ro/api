import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { EstadoDtoProperties } from './estado.dto';

// ======================================================

@ObjectType('EstadoFindOneResult')
export class EstadoFindOneResultDto implements Dto.IEstadoFindOneResultDto {
  @DtoProperty(EstadoDtoProperties.ESTADO_ID)
  id!: number;

  // ==============

  @DtoProperty(EstadoDtoProperties.ESTADO_NOME)
  nome!: string;

  @DtoProperty(EstadoDtoProperties.ESTADO_SIGLA)
  sigla!: string;
}

// ======================================================
