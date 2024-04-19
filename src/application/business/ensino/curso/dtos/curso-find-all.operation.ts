import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { CursoFindOneResultDto } from './curso-find-one.operation';
import { CursoDto } from './curso.dto';

// ======================================================

@ObjectType('CursoFindAllResult')
export class CursoFindAllResultDto extends PaginatedResultDto<Dto.ICursoFindOneResultDto> implements Dto.ICursoFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [CursoDto],
    },
    swagger: {
      type: [CursoFindOneResultDto],
    },
  })
  data!: Dto.ICursoFindOneResultDto[];
}

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
