import * as Spec from '@sisgea/spec';
import { createDtoOperationOptions } from '../../../../documentacao/api-documentate';
import { SearchInputDto, SearchInputValidationContract } from '../../../../documentacao/common';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';

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
