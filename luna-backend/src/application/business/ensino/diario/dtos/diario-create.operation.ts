// ======================================================

import { createDtoOperationOptions } from 'infrastructure';
import { DiarioFindOneResultDto } from './diario-find-one.operation';
import { DiarioInputDto, DiarioInputDtoValidationContract } from './diario-input.operation';
import { DiarioDto } from './diario.dto';

export const DIARIO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "diario".',

  gql: {
    name: 'diarioCreate',

    inputDtoType: () => DiarioInputDto,
    inputDtoValidationContract: DiarioInputDtoValidationContract,

    returnType: () => DiarioDto,
  },

  swagger: {
    inputBodyType: DiarioInputDto,
    inputBodyValidationContract: DiarioInputDtoValidationContract,

    returnType: DiarioFindOneResultDto,
  },
});
