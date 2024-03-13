// ======================================================

import { createDtoOperationOptions } from 'infrastructure';
import { TurmaFindOneResultDto } from './turma-find-one.operation';
import { TurmaInputDto, TurmaInputDtoValidationContract } from './turma-input.operation';
import { TurmaDto } from './turma.dto';

export const TURMA_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "turma".',

  gql: {
    name: 'turmaCreate',

    inputDtoType: () => TurmaInputDto,
    inputDtoValidationContract: TurmaInputDtoValidationContract,

    returnType: () => TurmaDto,
  },

  swagger: {
    inputBodyType: TurmaInputDto,
    inputBodyValidationContract: TurmaInputDtoValidationContract,

    returnType: TurmaFindOneResultDto,
  },
});
