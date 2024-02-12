import { createDtoOperationOptions } from '../../../../../infrastructure';
import { CampusFindOneResultDto } from './campus-find-one.result.dto';
import { CampusDto } from './campus.dto';

export const CampusOperations = {
  CAMPUS_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os campi cadastrados no sistema.',

    gql: {
      name: 'campusFindAll',
      type: () => [CampusDto],
    },

    swagger: {
      type: [CampusFindOneResultDto],
    },
  }),

  // ===============================

  CAMPUS_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um campus por ID.',

    gql: {
      name: 'campusFindOneById',
      type: () => CampusDto,
    },

    swagger: {
      type: CampusFindOneResultDto,
    },
  }),

  // ===============================
};
