import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractUuid, createValidationContract, getSchemaField } from '../../../../validacao';
import { DtoProperty, createDtoOperationOptions } from '../../../../legacy';
import { AmbienteDtoProperties, AmbienteDtoValidationContract } from './ambiente.dto';

// ======================================================

export const AmbienteDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(AmbienteDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('AmbienteDeleteOneByIdInputDto')
export class AmbienteDeleteOneByIdInputDto implements Dto.IAmbienteDeleteOneByIdInputDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;
}

// ======================================================

export const AMBIENTE_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de um ambiente por ID.',

  gql: {
    name: 'ambienteDeleteOneById',

    inputDtoType: () => AmbienteDeleteOneByIdInputDto,
    inputDtoValidationContract: AmbienteDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID do ambiente.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
