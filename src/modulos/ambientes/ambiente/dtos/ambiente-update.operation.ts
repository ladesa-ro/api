import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions } from '../../../../legacy';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { ValidationContractObjectUuidBase, ValidationContractUuid, createValidationContract } from '../../../../validacao';
import { AmbienteFindOneByIdInputValidationContract, AmbienteFindOneResultDto } from './ambiente-find-one.operation';
import { AmbienteInputDtoValidationContract } from './ambiente-input.operation';
import { AmbienteDto } from './ambiente.dto';

// ======================================================

export const AmbienteUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = AmbienteInputDtoValidationContract();

  return yup
    .object()
    .concat(AmbienteFindOneByIdInputValidationContract())
    .concat(schema.pick(['nome', 'descricao', 'codigo', 'capacidade', 'tipo']).partial())
    .shape({
      bloco: ValidationContractObjectUuidBase({ required: true, optional: true }),
    });
});

// ======================================================
export const AmbienteUpdateInputDto = createEntityDtoClass(Spec.AmbienteUpdateDeclaration, 'input');
// ======================================================

export const AMBIENTE_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de um ambiente.',

  gql: {
    name: 'ambienteUpdate',

    inputDtoType: () => AmbienteUpdateInputDto,
    inputDtoValidationContract: AmbienteUpdateInputDtoValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    inputBodyType: AmbienteUpdateInputDto,

    inputBodyValidationContract: createValidationContract(() => AmbienteUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID do ambiente.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: AmbienteFindOneResultDto,
  },
});

// ======================================================
