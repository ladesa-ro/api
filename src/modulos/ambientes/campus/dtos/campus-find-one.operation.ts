import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';
import { CampusDto, CampusDtoValidationContract } from './campus.dto';

// ======================================================
export const CampusFindOneResultDto = createEntityDtoClass(Spec.CampusFindOneResultDeclaration, 'output');
export const CampusFindOneByIdInputDto = createEntityDtoClass(Spec.CampusFindOneByIdInputDeclaration, 'input');

// ======================================================

export const CampusFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CampusDtoValidationContract(), 'id'),
  }),
);
// ======================================================

export const CAMPUS_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um campus por ID.',

  gql: {
    name: 'campusFindOneById',

    inputDtoType: () => CampusFindOneByIdInputDto,
    inputDtoValidationContract: CampusFindOneByIdInputValidationContract,

    returnType: () => CampusDto,
  },

  swagger: {
    returnType: CampusFindOneResultDto,

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
