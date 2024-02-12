import { createDtoOperationOptions } from '../../../../../infrastructure';
import { EstadoFindOneResultDto } from './estado-find-one.result.dto';
import { EstadoDto } from './estado.dto';

export const EstadoOperations = {
  ESTADO_FIND_ALL: createDtoOperationOptions({
    description:
      'Lista de todos os estados brasileiros cadastrados no sistema.',

    gql: {
      name: 'estadoFindAll',
      type: () => [EstadoDto],
    },

    swagger: {
      type: [EstadoFindOneResultDto],
    },
  }),

  // ===============================

  ESTADO_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um estado por ID IBGE do estado.',

    gql: {
      name: 'estadoFindOneById',
      type: () => EstadoDto,
    },

    swagger: {
      type: EstadoFindOneResultDto,
    },
  }),

  // ===============================

  ESTADO_FIND_ONE_BY_UF: createDtoOperationOptions({
    description: 'Realiza a consulta a um estado por sigla da UF.',

    gql: {
      name: 'estadoFindOneByUf',
      type: () => EstadoDto,
    },

    swagger: {
      type: EstadoFindOneResultDto,
    },
  }),
};
