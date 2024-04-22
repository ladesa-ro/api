import { CursoDeleteOneByIdInputDeclarationFactory } from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
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
