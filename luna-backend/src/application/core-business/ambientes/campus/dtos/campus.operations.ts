import {
  CampusFindOneByIdInputDto,
  CampusFindOneByIdInputValidationContract,
} from '.';
import {
  ValidationContractUuid,
  createDtoOperationOptions,
} from '../../../../../infrastructure';
import { CampusFindOneResultDto } from './campus-find-one.result.dto';
import {
  CampusInputDto,
  CampusInputDtoValidationContract,
} from './campus-input.dto';
import { CampusDto } from './campus.dto';

export const CampusOperations = {
  CAMPUS_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os campi cadastrados no sistema.',

    gql: {
      name: 'campusFindAll',
      returnType: () => [CampusDto],
    },

    swagger: {
      returnType: [CampusFindOneResultDto],
    },
  }),

  // ===============================

  CAMPUS_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um campus por ID.',

    gql: {
      name: 'campusFindOneById',

      inputDtoType: () => CampusFindOneByIdInputDto,
      inputDtoValidationContract: CampusFindOneByIdInputValidationContract,

      returnType: () => CampusDto,
    },

    swagger: {
      returnType: CampusFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID do campus.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================

  CAMPUS_CREATE: createDtoOperationOptions({
    description: 'Realiza o cadastro de um campus.',

    gql: {
      name: 'campusCreate',

      inputDtoType: () => CampusInputDto,
      inputDtoValidationContract: CampusInputDtoValidationContract,

      returnType: () => CampusDto,
    },

    swagger: {
      inputBodyType: CampusInputDto,
      inputBodyValidationContract: CampusInputDtoValidationContract,

      returnType: CampusFindOneResultDto,
    },
  }),

  // ===============================
};
