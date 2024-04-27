import * as yup from 'yup';
import { ValidationContractObjectUuidBase, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
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
import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
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
