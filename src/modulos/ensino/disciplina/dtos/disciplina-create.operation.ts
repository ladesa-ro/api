// ======================================================

import { createDtoOperationOptions } from '../../../../infraestrutura';
import { DisciplinaFindOneResultDto } from './disciplina-find-one.operation';
import { DisciplinaInputDto, DisciplinaInputDtoValidationContract } from './disciplina-input.operation';
import { DisciplinaDto } from './disciplina.dto';

export const DISCIPLINA_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "disciplina".',

  gql: {
    name: 'disciplinaCreate',

    inputDtoType: () => DisciplinaInputDto,
    inputDtoValidationContract: DisciplinaInputDtoValidationContract,

    returnType: () => DisciplinaDto,
  },

  swagger: {
    inputBodyType: DisciplinaInputDto,
    inputBodyValidationContract: DisciplinaInputDtoValidationContract,

    returnType: DisciplinaFindOneResultDto,
  },
});
