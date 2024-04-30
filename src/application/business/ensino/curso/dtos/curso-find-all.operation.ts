import { CursoFindAllResultDeclaration } from '@sisgea/spec';
import { SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { createEntityDtoClass } from '../../../../../infrastructure/utils/createDtoClass';

// ======================================================

export const CursoFindAllResultDto = createEntityDtoClass(CursoFindAllResultDeclaration, 'output');

// =============================================================

export const CURSO_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de "curso" cadastrados no sistema.',

  gql: {
    name: 'cursoFindAll',
    returnType: () => CursoFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: CursoFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
      'filter.campus.id',
      'filter.campus.cnpj',
      'filter.campus.razaoSocial',
      'filter.campus.nomeFantasia',
      'filter.modalidade.id',
      'filter.modalidade.nome',
      'filter.modalidade.slug',
    ],
  },
});

// ======================================================
