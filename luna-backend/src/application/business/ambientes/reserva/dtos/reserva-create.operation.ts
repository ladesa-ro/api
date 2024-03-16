// ======================================================

import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from 'infrastructure';
import * as yup from 'yup';
import { ReservaFindOneByIdInputValidationContract, ReservaFindOneResultDto } from './reserva-find-one.operation';
import { ReservaInputDto, ReservaInputDtoValidationContract } from './reserva-input.operation';
import { ReservaDto } from './reserva.dto';

// ======================================================

export const ReservaCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = ReservaInputDtoValidationContract();

  return yup
    .object()
    .concat(ReservaFindOneByIdInputValidationContract())
    .concat(schema.pick(['situacao', 'motivo', 'tipo', 'dataInicio', 'dataTermino']))
    .shape({
      ambiente: ValidationContractObjectUuidBase({ required: true, optional: false }),
      usuario: ValidationContractObjectUuidBase({ required: true, optional: false }),
    });
});

// ======================================================

export const RESERVA_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de "reserva".',

  gql: {
    name: 'reservaCreate',

    inputDtoType: () => ReservaInputDto,
    inputDtoValidationContract: ReservaCreateInputDtoValidationContract,

    returnType: () => ReservaDto,
  },

  swagger: {
    inputBodyType: ReservaInputDto,
    inputBodyValidationContract: ReservaCreateInputDtoValidationContract,

    returnType: ReservaFindOneResultDto,
  },
});
