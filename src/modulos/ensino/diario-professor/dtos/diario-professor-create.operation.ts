import { createDtoOperationOptions } from '../../../../legacy';
import { DiarioProfessorFindOneResultDto } from './diario-professor-find-one.operation';
import { DiarioProfessorInputDto, DiarioProfessorInputDtoValidationContract } from './diario-professor-input.operation';
import { DiarioProfessorDto } from './diario-professor.dto';

export const DIARIO_PROFESSOR_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de vínculo de diário e professor.',

  gql: {
    name: 'diarioProfessorCreate',

    inputDtoType: () => DiarioProfessorInputDto,
    inputDtoValidationContract: DiarioProfessorInputDtoValidationContract,

    returnType: () => DiarioProfessorDto,
  },

  swagger: {
    inputBodyType: DiarioProfessorInputDto,
    inputBodyValidationContract: DiarioProfessorInputDtoValidationContract,

    returnType: DiarioProfessorFindOneResultDto,
  },
});
