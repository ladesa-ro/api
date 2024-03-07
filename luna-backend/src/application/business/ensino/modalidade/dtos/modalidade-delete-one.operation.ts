import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { ModalidadeDtoProperties, ModalidadeDtoValidationContract } from './modalidade.dto';

// ======================================================

export const ModalidadeDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(ModalidadeDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('ModalidadeDeleteOneByIdInputDto')
export class ModalidadeDeleteOneByIdInputDto implements Dto.IModalidadeDeleteOneByIdInputDto {
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_ID)
  id!: string;
}

// ======================================================

export const MODALIDADE_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de uma modalidade por ID.',

  gql: {
    name: 'ModalidadeDeleteOneById',

    inputDtoType: () => ModalidadeDeleteOneByIdInputDto,
    inputDtoValidationContract: ModalidadeDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID da modalidade.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
