import * as Spec from '@sisgea/spec';
import { SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { createEntityDtoClass } from '../../../../../infrastructure/utils/createDtoClass';

// =============================================================

export const CampusFindAllResultDto = createEntityDtoClass(Spec.CampusFindAllResultDeclaration, 'output');

// =============================================================

export const CAMPUS_FIND_ALL = createDtoOperationOptions({
  description: 'Listagem de todos os campi cadastrados no sistema.',

  gql: {
    name: 'campusFindAll',
    returnType: () => CampusFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: CampusFindAllResultDto,
    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.endereco.cidade.id',
      'filter.endereco.cidade.nome',
      'filter.endereco.cidade.estado.id',
      'filter.endereco.cidade.estado.nome',
      'filter.endereco.cidade.estado.sigla',
    ],
  },
});

// =============================================================
