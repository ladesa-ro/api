import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { ModalidadeDtoValidationContract } from './modalidade.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, getSchemaField, ValidationContractUuid } from '../../../../validacao';

// ======================================================

export const ModalidadeDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(ModalidadeDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const ModalidadeDeleteOneByIdInputDto = createEntityDtoClass(Spec.ModalidadeDeleteOneByIdInputDeclaration, 'input');

// ======================================================

export const MODALIDADE_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de uma modalidade por ID.',

  gql: {
    name: 'modalidadeDeleteOneById',

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
