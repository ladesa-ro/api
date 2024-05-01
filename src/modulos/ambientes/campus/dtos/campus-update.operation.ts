import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { CampusFindOneByIdInputValidationContract, CampusFindOneResultDto } from './campus-find-one.operation';
import { CampusInputDtoValidationContract } from './campus-input.dto';
import { CampusDto } from './campus.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, ValidationContractUuid } from '../../../../validacao';

// ======================================================

export const CampusUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(CampusFindOneByIdInputValidationContract())
      .concat(CampusInputDtoValidationContract().partial())
      .shape({
        // endereco: EnderecoInputDtoValidationContract().optional(),
      })
  );
});

// ======================================================

export const CampusUpdateInputDto = createEntityDtoClass(Spec.CampusUpdateDeclaration, 'input');

// ======================================================

export const CAMPUS_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de um campus.',

  gql: {
    name: 'campusUpdate',

    inputDtoType: () => CampusUpdateInputDto,
    inputDtoValidationContract: CampusUpdateInputDtoValidationContract,

    returnType: () => CampusDto,
  },

  swagger: {
    inputBodyType: CampusUpdateInputDto,

    inputBodyValidationContract: createValidationContract(() => CampusUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID do campus.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: CampusFindOneResultDto,
  },
});

// ======================================================
