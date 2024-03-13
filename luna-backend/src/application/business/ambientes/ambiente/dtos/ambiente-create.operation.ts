import { createDtoOperationOptions } from '../../../../../infrastructure';
import { AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteInputDto, AmbienteInputDtoValidationContract } from './ambiente-input.operation';
import { AmbienteDto } from './ambiente.dto';

// ======================================================

export const AMBIENTE_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um ambiente.',

  gql: {
    name: 'ambienteCreate',

    inputDtoType: () => AmbienteInputDto,
    inputDtoValidationContract: AmbienteInputDtoValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    inputBodyType: AmbienteInputDto,
    inputBodyValidationContract: AmbienteInputDtoValidationContract,

    returnType: AmbienteFindOneResultDto,
  },
});

// ======================================================
