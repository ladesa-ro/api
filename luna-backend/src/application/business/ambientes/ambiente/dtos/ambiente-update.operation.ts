import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { AmbienteFindOneByIdInputValidationContract, AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteInputDtoValidationContract } from './ambiente-input.operation';
import { AmbienteDto, AmbienteDtoProperties } from './ambiente.dto';

// ======================================================

export const AmbienteUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup
    .object()
    .concat(AmbienteFindOneByIdInputValidationContract())
    .concat(AmbienteInputDtoValidationContract().partial().omit(['bloco']))
    .shape({
      bloco: yup.mixed().strip().optional().nullable(),
    });
});

// ======================================================

@InputType('AmbienteUpdateInputDto')
export class AmbienteUpdateInputDto implements Dto.IAmbienteUpdateDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;

  //

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_NOME, { required: false })
  nome?: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_DESCRICAO, { required: false })
  descricao?: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CODIGO, { required: false })
  codigo?: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CAPACIDADE, { required: false })
  capacidade?: number | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_TIPO, { required: false })
  tipo?: string | null;

  //
}

// ======================================================

export class AmbienteUpdateWithoutIdInputDto extends OmitType(AmbienteUpdateInputDto, ['id'] as const) {}

// ======================================================

export const AMBIENTE_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de um ambiente.',

  gql: {
    name: 'ambienteUpdate',

    inputDtoType: () => AmbienteUpdateInputDto,
    inputDtoValidationContract: AmbienteUpdateInputDtoValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    inputBodyType: AmbienteUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => AmbienteUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID do ambiente.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: AmbienteFindOneResultDto,
  },
});

// ======================================================
