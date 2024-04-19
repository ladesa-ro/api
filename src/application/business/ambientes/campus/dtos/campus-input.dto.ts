import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CampusDtoProperties, CampusDtoValidationContract } from './campus.dto';

// ======================================================

export const CampusInputDtoValidationContract = createValidationContract(() => {
  const schema = CampusDtoValidationContract();

  return yup.object().shape({
    nomeFantasia: getSchemaField(schema, 'nomeFantasia'),
    razaoSocial: getSchemaField(schema, 'razaoSocial'),
    apelido: getSchemaField(schema, 'apelido'),
    cnpj: getSchemaField(schema, 'cnpj'),
  });
});

// ======================================================

@InputType('CampusInputDto')
export class CampusInputDto implements Dto.ICampusInputDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_NOME_FANTASIA)
  nomeFantasia!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_RAZAO_SOCIAL)
  razaoSocial!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_APELIDO)
  apelido!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_CNPJ)
  cnpj!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_ENDERECO_INPUT)
  endereco!: Dto.IEnderecoInputDto;

  @DtoProperty(CampusDtoProperties.CAMPUS_MODALIDADES_INPUT)
  modalidades!: Dto.IObjectUuid[];
}
