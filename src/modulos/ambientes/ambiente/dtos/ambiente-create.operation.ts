import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteInputDtoValidationContract } from './ambiente-input.operation';
import { AmbienteDto } from './ambiente.dto';
import { createValidationContract, ValidationContractObjectUuidBase } from '../../../../validacao';
import { createDtoOperationOptions } from '../../../../legacy';

// ======================================================
export const AmbienteCreateDto = createEntityDtoClass(Spec.AmbienteInputDeclaration, 'input');
// ======================================================

export const AmbienteCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = AmbienteInputDtoValidationContract();

  return yup
    .object()
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

    inputDtoType: () => AmbienteCreateDto,
    inputDtoValidationContract: AmbienteCreateInputDtoValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    inputBodyType: AmbienteCreateDto,
    inputBodyValidationContract: AmbienteCreateInputDtoValidationContract,

    returnType: AmbienteFindOneResultDto,
  },
});

// ======================================================
