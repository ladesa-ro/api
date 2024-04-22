import { CursoUpdateDeclaration } from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractObjectUuidBase, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { CursoFindOneByIdInputValidationContract, CursoFindOneResultDto } from './curso-find-one.operation';
import { CursoInputDtoValidationContract } from './curso-input.operation';
import { CursoDto } from './curso.dto';

// ======================================================

export const CursoUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = CursoInputDtoValidationContract().partial();

  return (
    yup
      //
      .object()
      .concat(CursoFindOneByIdInputValidationContract())
      .concat(schema.pick(['nome', 'nomeAbreviado']).partial())
      .shape({
        campus: ValidationContractObjectUuidBase({ required: true, optional: true }),
        modalidade: ValidationContractObjectUuidBase({ required: true, optional: true }),
      })
  );
});

// ======================================================

export const CursoUpdateInputDto = createEntityDtoClass(CursoUpdateDeclaration, 'input');

export const CURSO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "curso".',

  gql: {
    name: 'cursoUpdate',

    inputDtoType: () => CursoUpdateInputDto,
    inputDtoValidationContract: CursoUpdateInputDtoValidationContract,

    returnType: () => CursoDto,
  },

  swagger: {
    inputBodyType: CursoUpdateInputDto,

    inputBodyValidationContract: createValidationContract(() => CursoUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "curso".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: CursoFindOneResultDto,
  },
});

// ======================================================
