import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractObjectUuid, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDtoProperties, BlocoDtoValidationContract } from './bloco.dto';

// ======================================================

export const BlocoInputDtoValidationContract = createValidationContract(() => {
  const schema = BlocoDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    codigo: getSchemaField(schema, 'codigo'),

    campus: ValidationContractObjectUuid({ required: true }).defined().required(),
  });
});

// ======================================================

@InputType('BlocoInputDto')
export class BlocoInputDto implements Dto.IBlocoInputDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_NOME)
  nome!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CODIGO)
  codigo!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CAMPUS_INPUT)
  campus!: Dto.IObjectUuid;
}

// ======================================================
