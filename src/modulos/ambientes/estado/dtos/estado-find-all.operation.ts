import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { createDtoOperationOptions, SearchInputDto, SearchInputValidationContract } from '../../../../legacy';

// =============================================================

export const EstadoFindAllResultDto = createEntityDtoClass(Spec.EstadoFindAllResultDeclaration);

// =============================================================

export const ESTADO_FIND_ALL = createDtoOperationOptions({
  description: 'Listagem de todos os estados brasileiros cadastrados no sistema.',

  gql: {
    name: 'estadoFindAll',
    returnType: () => EstadoFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: EstadoFindAllResultDto,
    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
    ],
  },
});

// ======================================================
