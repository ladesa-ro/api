import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICampusInputDto, IEnderecoInputDto } from '../../../(dtos)';
import {
  DtoProperty,
  createValidationContract,
  getSchemaField,
} from '../../../../../infrastructure';
import { EnderecoInputDtoValidationContract } from '../../endereco/dtos';
import { CampusDtoProperties, CampusDtoValidationContract } from './campus.dto';

// ======================================================

export const CampusInputDtoValidationContract = createValidationContract(() => {
  const schema = CampusDtoValidationContract();

  return yup.object().shape({
    nomeFantasia: getSchemaField(schema, 'nomeFantasia'),

    razaoSocial: getSchemaField(schema, 'razaoSocial'),
    apelido: getSchemaField(schema, 'apelido'),
    cnpj: getSchemaField(schema, 'cnpj'),

    endereco: EnderecoInputDtoValidationContract(),
  });
});

// ======================================================

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
