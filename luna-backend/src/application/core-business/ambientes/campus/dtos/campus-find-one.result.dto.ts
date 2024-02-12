import { ObjectType } from '@nestjs/graphql';
import { CampusDtoProperties } from '.';
import {
  ICampusFindOneResultDto,
  IEnderecoFindOneResultDto,
} from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';

// ======================================================

@ObjectType('CampusFindOneResultDto')
export class CampusFindOneResultDto implements ICampusFindOneResultDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;

  //

  @DtoProperty(CampusDtoProperties.CAMPUS_NOME_FANTASIA)
  nomeFantasia!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_RAZAO_SOCIAL)
  razaoSocial!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_APELIDO)
  apelido!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_CNPJ)
  cnpj!: string;

  //

  @DtoProperty(CampusDtoProperties.CAMPUS_ENDERECO_OUTPUT)
  endereco!: IEnderecoFindOneResultDto;
}

// ======================================================
