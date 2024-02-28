import { BlocoDeleteOneByIdInputDto, BlocoDeleteOneByIdInputValidationContract, BlocoFindOneByIdInputDto, BlocoFindOneByIdInputValidationContract } from '.';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { BlocoFindOneResultDto } from './bloco-find-one.result.dto';
import { BlocoInputDto, BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoUpdateInputDto, BlocoUpdateInputDtoValidationContract, BlocoUpdateWithoutIdInputDto } from './bloco-update.input.dto';
import { BlocoDto } from './bloco.dto';

export const BlocoOperations = {
  BLOCO_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os blocos cadastrados no sistema.',

    gql: {
      name: 'blocoFindAll',
      returnType: () => [BlocoDto],
    },

    swagger: {
      returnType: [BlocoFindOneResultDto],
    },
  }),

  // ===============================

  BLOCO_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um bloco por ID.',

    gql: {
      name: 'blocoFindOneById',

      inputDtoType: () => BlocoFindOneByIdInputDto,
      inputDtoValidationContract: BlocoFindOneByIdInputValidationContract,

      returnType: () => BlocoDto,
    },

    swagger: {
      returnType: BlocoFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID do bloco.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================

  BLOCO_CREATE: createDtoOperationOptions({
    description: 'Realiza o cadastro de um bloco.',

    gql: {
      name: 'blocoCreate',

      inputDtoType: () => BlocoInputDto,
      inputDtoValidationContract: BlocoInputDtoValidationContract,

      returnType: () => BlocoDto,
    },

    swagger: {
      inputBodyType: BlocoInputDto,
      inputBodyValidationContract: BlocoInputDtoValidationContract,

      returnType: BlocoFindOneResultDto,
    },
  }),

  // ===============================

  BLOCO_UPDATE: createDtoOperationOptions({
    description: 'Realiza a alteração de um bloco.',

    gql: {
      name: 'blocoUpdate',

      inputDtoType: () => BlocoUpdateInputDto,
      inputDtoValidationContract: BlocoUpdateInputDtoValidationContract,

      returnType: () => BlocoDto,
    },

    swagger: {
      inputBodyType: BlocoUpdateWithoutIdInputDto,

      inputBodyValidationContract: createValidationContract(() => BlocoUpdateInputDtoValidationContract().omit(['id'])),

      params: [
        {
          name: 'id',
          description: 'ID do bloco.',
          validationContract: ValidationContractUuid,
        },
      ],

      returnType: BlocoFindOneResultDto,
    },
  }),

  // ===============================

  BLOCO_DELETE_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a remoção de um bloco por ID.',

    gql: {
      name: 'blocoDeleteOneById',

      inputDtoType: () => BlocoDeleteOneByIdInputDto,
      inputDtoValidationContract: BlocoDeleteOneByIdInputValidationContract,

      returnType: () => Boolean,
    },

    swagger: {
      returnType: Boolean,

      params: [
        {
          name: 'id',
          description: 'ID do bloco.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================
};
