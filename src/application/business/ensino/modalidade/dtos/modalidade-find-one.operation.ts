import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { ModalidadeDto, ModalidadeDtoValidationContract } from './modalidade.dto';

// ======================================================

export const ModalidadeFindOneResultDto = createEntityDtoClass(Spec.ModalidadeFindOneResultDeclaration, 'output');
export const ModalidadeFindOneByIdInputDto = createEntityDtoClass(Spec.ModalidadeFindOneByIdInputDeclaration, 'input');

// ======================================================

export const ModalidadeFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(ModalidadeDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const MODALIDADE_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a uma modalidade por ID.',

  gql: {
    name: 'modalidadeFindOneById',

    inputDtoType: () => ModalidadeFindOneByIdInputDto,
    inputDtoValidationContract: ModalidadeFindOneByIdInputValidationContract,

    returnType: () => ModalidadeDto,
  },

  swagger: {
    returnType: ModalidadeFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da modalidade.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
