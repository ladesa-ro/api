import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDtoValidationContract } from './bloco.dto';
import { BlocoFindOneByIdInputDto } from './bloco-find-one.operation';

// ======================================================

export const BlocoDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(BlocoDtoValidationContract(), 'id'),
  }),
);

// ======================================================
export const BlocoDeleteOneByIdInputDto = BlocoFindOneByIdInputDto;
// ======================================================

export const BLOCO_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de um bloco por ID.',

  gql: {
    name: 'blocoDeleteOneById',

    inputDtoType: () => BlocoDeleteOneByIdInputDto,
    inputDtoValidationContract: BlocoDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
