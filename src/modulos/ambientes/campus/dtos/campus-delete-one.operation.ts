import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { CampusDtoValidationContract } from './campus.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, getSchemaField, ValidationContractUuid } from '../../../../validacao';

// ======================================================
export const CampusDeleteOneByIdInputDto = createEntityDtoClass(Spec.CampusDeleteOneByIdInputDeclaration, 'input');
// ======================================================

export const CampusDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CampusDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const CAMPUS_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de um campus por ID.',

  gql: {
    name: 'campusDeleteOneById',

    inputDtoType: () => CampusDeleteOneByIdInputDto,
    inputDtoValidationContract: CampusDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID do campus.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
