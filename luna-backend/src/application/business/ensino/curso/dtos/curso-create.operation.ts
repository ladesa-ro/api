// ======================================================

import { createDtoOperationOptions } from 'infrastructure';
import { CursoFindOneResultDto } from './curso-find-one.operation';
import { CursoInputDto, CursoInputDtoValidationContract } from './curso-input.operation';
import { CursoDto } from './curso.dto';

export const CURSO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "curso".',

  gql: {
    name: 'cursoCreate',

    inputDtoType: () => CursoInputDto,
    inputDtoValidationContract: CursoInputDtoValidationContract,

    returnType: () => CursoDto,
  },

  swagger: {
    inputBodyType: CursoInputDto,
    inputBodyValidationContract: CursoInputDtoValidationContract,

    returnType: CursoFindOneResultDto,
  },
});
