import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { ModalidadeFindOneResultDto } from './modalidade-find-one.operation';
import { ModalidadeDto } from './modalidade.dto';

// ======================================================

@ObjectType('ModalidadeFindAllResult')
export class ModalidadeFindAllResultDto extends PaginatedResultDto<Dto.IModalidadeFindOneResultDto> implements Dto.IModalidadeFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [ModalidadeDto],
    },
    swagger: {
      type: [ModalidadeFindOneResultDto],
    },
  })
  data!: Dto.IModalidadeFindOneResultDto[];
}

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
