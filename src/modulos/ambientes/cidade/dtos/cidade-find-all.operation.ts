import * as Spec from '@sisgea/spec';
import { SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';

// =============================================================

export const CidadeFindAllResultDto = createEntityDtoClass(Spec.CidadeFindAllResultDeclaration);

// =============================================================

export const CIDADE_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todas as cidades brasileiras cadastradas no sistema.',

  gql: {
    name: 'cidadeFindAll',
    returnType: () => CidadeFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: CidadeFindAllResultDto,
    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.estado.id',
      'filter.estado.nome',
      'filter.estado.sigla',
    ],
  },
});

// =============================================================
