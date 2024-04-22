import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CampusDtoValidationContract } from './campus.dto';

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
