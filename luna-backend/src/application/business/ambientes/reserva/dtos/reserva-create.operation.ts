// ======================================================

import { createDtoOperationOptions } from 'infrastructure';
import { ReservaFindOneResultDto } from './reserva-find-one.operation';
import { ReservaInputDto, ReservaInputDtoValidationContract } from './reserva-input.operation';
import { ReservaDto } from './reserva.dto';

export const RESERVA_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "reserva".',

  gql: {
    name: 'reservaCreate',

    inputDtoType: () => ReservaInputDto,
    inputDtoValidationContract: ReservaInputDtoValidationContract,

    returnType: () => ReservaDto,
  },

  swagger: {
    inputBodyType: ReservaInputDto,
    inputBodyValidationContract: ReservaInputDtoValidationContract,

    returnType: ReservaFindOneResultDto,
  },
});
