import { AmbienteDeleteOneByIdInputDto, AmbienteDeleteOneByIdInputValidationContract, AmbienteFindOneByIdInputDto, AmbienteFindOneByIdInputValidationContract } from '.';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { AmbienteFindOneResultDto } from './ambiente-find-one.result.dto';
import { AmbienteInputDto, AmbienteInputDtoValidationContract } from './ambiente-input.dto';
import { AmbienteUpdateInputDto, AmbienteUpdateInputDtoValidationContract, AmbienteUpdateWithoutIdInputDto } from './ambiente-update.input.dto';
import { AmbienteDto } from './ambiente.dto';

export const AmbienteOperations = {
  AMBIENTE_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os ambientes cadastrados no sistema.',

    gql: {
      name: 'ambienteFindAll',
      returnType: () => [AmbienteDto],
    },

    swagger: {
      returnType: [AmbienteFindOneResultDto],
    },
  }),

  // ===============================

  AMBIENTE_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um ambiente por ID.',

    gql: {
      name: 'ambienteFindOneById',

      inputDtoType: () => AmbienteFindOneByIdInputDto,
      inputDtoValidationContract: AmbienteFindOneByIdInputValidationContract,

      returnType: () => AmbienteDto,
    },

    swagger: {
      returnType: AmbienteFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID do ambiente.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================

  AMBIENTE_CREATE: createDtoOperationOptions({
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
  }),

  // ===============================

  AMBIENTE_UPDATE: createDtoOperationOptions({
    description: 'Realiza a alteração de um ambiente.',

    gql: {
      name: 'ambienteUpdate',

      inputDtoType: () => AmbienteUpdateInputDto,
      inputDtoValidationContract: AmbienteUpdateInputDtoValidationContract,

      returnType: () => AmbienteDto,
    },

    swagger: {
      inputBodyType: AmbienteUpdateWithoutIdInputDto,

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
  }),

  // ===============================

  AMBIENTE_DELETE_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a remoção de um ambiente por ID.',

    gql: {
      name: 'ambienteDeleteOneById',

      inputDtoType: () => AmbienteDeleteOneByIdInputDto,
      inputDtoValidationContract: AmbienteDeleteOneByIdInputValidationContract,

      returnType: () => Boolean,
    },

    swagger: {
      returnType: Boolean,

      params: [
        {
          name: 'id',
          description: 'ID do ambiente.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================
};
