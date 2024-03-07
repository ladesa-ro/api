import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import { DtoProperty, ValidationContractObjectUuid, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { ModalidadeDtoProperties, ModalidadeDtoValidationContract } from './modalidade.dto';

// ======================================================

export const ModalidadeInputDtoValidationContract = createValidationContract(() => {
  const schema = ModalidadeDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    slug: getSchemaField(schema, 'slug'),

    campus: ValidationContractObjectUuid({ required: true }).defined().required(),
  });
});

// ======================================================

@InputType('ModalidadeInputDto')
export class ModalidadeInputDto implements Dto.IModalidadeInputDto{
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_NOME)
  nome!: string;

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_SLUG)
  slug!: string;

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_CAMPUS_INPUT)
  campus!: Dto.IObjectUuid;
}


