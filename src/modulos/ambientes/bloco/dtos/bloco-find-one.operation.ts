import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { BlocoDto, BlocoDtoValidationContract } from './bloco.dto';

// ======================================================
export const BlocoFindOneByIdInputDto = createEntityDtoClass(Spec.BlocoFindOneByIdInputDeclaration, 'input');
export const BlocoFindOneResultDto = createEntityDtoClass(Spec.BlocoFindOneResultDeclaration, 'output');
// ======================================================

export const BlocoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(BlocoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const BLOCO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um bloco por ID.',

  gql: {
    name: 'blocoFindOneById',

    inputDtoType: () => BlocoFindOneByIdInputDto,
    inputDtoValidationContract: BlocoFindOneByIdInputValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    returnType: BlocoFindOneResultDto,

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
