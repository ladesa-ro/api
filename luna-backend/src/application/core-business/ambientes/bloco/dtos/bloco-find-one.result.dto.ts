import { ObjectType } from '@nestjs/graphql';
import { IBlocoFindOneResultDto, ICampusFindOneResultDto } from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { BlocoDtoProperties } from './bloco.dto';

// ======================================================

@ObjectType('BlocoFindOneResultDto')
export class BlocoFindOneResultDto implements IBlocoFindOneResultDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;

  //

  @DtoProperty(BlocoDtoProperties.BLOCO_NOME)
  nome!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CODIGO)
  codigo!: string;

  //

  @DtoProperty(BlocoDtoProperties.BLOCO_CAMPUS_OUTPUT)
  campus!: ICampusFindOneResultDto;
}

// ======================================================
