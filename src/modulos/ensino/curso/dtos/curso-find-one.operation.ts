import { CursoFindOneByIdInputDeclarationFactory, CursoFindOneResultDeclaration } from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { CursoDto, CursoDtoValidationContract } from './curso.dto';

// ======================================================

export const CursoFindOneResultDto = createEntityDtoClass(CursoFindOneResultDeclaration, 'output');
export const CursoFindOneByIdInputDto = createEntityDtoClass(CursoFindOneByIdInputDeclarationFactory, 'input');

// ======================================================

export const CursoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CursoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const CURSO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "curso"" por ID.',

  gql: {
    name: 'cursoFindOneById',

    inputDtoType: () => CursoFindOneByIdInputDto,
    inputDtoValidationContract: CursoFindOneByIdInputValidationContract,

    returnType: () => CursoDto,
  },

  swagger: {
    returnType: CursoFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da curso.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
