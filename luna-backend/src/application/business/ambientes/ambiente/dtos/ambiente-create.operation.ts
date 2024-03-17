import * as yup from 'yup';
import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { AmbienteFindOneByIdInputValidationContract, AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteInputDto, AmbienteInputDtoValidationContract } from './ambiente-input.operation';
import { AmbienteDto } from './ambiente.dto';

// ======================================================

export const AmbienteCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = AmbienteInputDtoValidationContract();

  return yup
    .object()
    .concat(AmbienteFindOneByIdInputValidationContract())
    .concat(schema.pick(['nome', 'descricao', 'codigo', 'capacidade', 'tipo']))
    .shape({
      bloco: ValidationContractObjectUuidBase({ required: true, optional: false }),
    });
});

// ======================================================

export const AMBIENTE_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um ambiente.',

  gql: {
    name: 'ambienteCreate',

    inputDtoType: () => AmbienteInputDto,
    inputDtoValidationContract: AmbienteCreateInputDtoValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    inputBodyType: AmbienteInputDto,
    inputBodyValidationContract: AmbienteCreateInputDtoValidationContract,

    returnType: AmbienteFindOneResultDto,
  },
});

// ======================================================
