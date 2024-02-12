import { createDtoOperationOptions } from '../../../../../infrastructure';
import { CidadeFindOneResultDto } from './cidade-find-one.result.dto';
import { CidadeDto } from './cidade.dto';

// ======================================================

export const CidadeOperations = {
  //

  CIDADE_FIND_ALL: createDtoOperationOptions({
    description:
      'Lista de todas as cidades brasileiras cadastradas no sistema.',

    gql: {
      type: () => [CidadeDto],
      name: 'cidadeFindAll',
    },

    swagger: {
      type: [CidadeFindOneResultDto],
    },
  }),

  //

  CIDADE_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Retorna a consulta a uma cidade por ID IBGE.',

    gql: {
      type: () => CidadeDto,
      name: 'cidadeFindOne',
    },

    swagger: {
      type: CidadeFindOneResultDto,
    },
  }),

  //
};

// ======================================================
