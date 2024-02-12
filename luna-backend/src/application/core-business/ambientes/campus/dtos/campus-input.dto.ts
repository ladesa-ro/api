import { InputType } from '@nestjs/graphql';
import { ICampusInputDto, IEnderecoInputDto } from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { CampusDtoProperties } from './campus.dto';

@InputType('CampusInputDto')
export class CampusInputDto implements ICampusInputDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_NOME_FANTASIA)
  nomeFantasia!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_RAZAO_SOCIAL)
  razaoSocial!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_APELIDO)
  apelido!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_CNPJ)
  cnpj!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_ENDERECO_INPUT)
  endereco!: IEnderecoInputDto;
}
