import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { ModalidadeFindOneByIdInputValidationContract, ModalidadeFindOneResultDto } from './modalidade-find-one.operation';
import { ModalidadeInputDtoValidationContract } from './modalidade-input.operation';
import { ModalidadeDto } from './modalidade.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, ValidationContractUuid } from '../../../../validacao';

// ======================================================

export const ModalidadeUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(ModalidadeFindOneByIdInputValidationContract())
      .concat(ModalidadeInputDtoValidationContract().partial())
      .shape({})
  );
});

// ======================================================

export const ModalidadeUpdateInputDto = createEntityDtoClass(Spec.ModalidadeUpdateDeclaration, 'input');

// ======================================================

export const MODALIDADE_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de uma modalidade.',

  gql: {
    name: 'modalidadeUpdate',

    inputDtoType: () => ModalidadeUpdateInputDto,
    inputDtoValidationContract: ModalidadeUpdateInputDtoValidationContract,

    returnType: () => ModalidadeDto,
  },

  swagger: {
    inputBodyType: ModalidadeUpdateInputDto,

    inputBodyValidationContract: createValidationContract(() => ModalidadeUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID da modalidade.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: ModalidadeFindOneResultDto,
  },
});

// ======================================================
