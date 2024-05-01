import { CursoDeleteOneByIdInputDeclarationFactory } from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, getSchemaField, ValidationContractUuid } from '../../../../validacao';

import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { CursoDtoValidationContract } from './curso.dto';

// ======================================================

export const CursoDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CursoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const CursoDeleteOneByIdInputDto = createEntityDtoClass(CursoDeleteOneByIdInputDeclarationFactory, 'input');

// ======================================================

export const CURSO_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "curso" por ID.',

  gql: {
    name: 'CursoDeleteOneById',

    inputDtoType: () => CursoDeleteOneByIdInputDto,
    inputDtoValidationContract: CursoDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "curso".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
