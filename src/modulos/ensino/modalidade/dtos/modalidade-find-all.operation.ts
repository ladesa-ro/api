import * as Spec from '@sisgea/spec';
import { createDtoOperationOptions, SearchInputDto, SearchInputValidationContract } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';

// ======================================================

export const ModalidadeFindAllResultDto = createEntityDtoClass(Spec.ModalidadeFindAllResultDeclaration, 'output');

// =============================================================

export const MODALIDADE_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todas as modalidades cadastrados no sistema.',

  gql: {
    name: 'modalidadeFindAll',
    returnType: () => ModalidadeFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: ModalidadeFindAllResultDto,

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
