import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { UsuarioFindOneResultDto } from './usuario-find-one.result.dto';
import { UsuarioDto } from './usuario.dto';

// ======================================================

@ObjectType('UsuarioFindAllResult')
export class UsuarioFindAllResultDto extends PaginatedResultDto<Dto.IUsuarioFindOneResultDto> implements Dto.IUsuarioFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [UsuarioDto],
    },
    swagger: {
      type: [UsuarioFindOneResultDto],
    },
  })
  data!: Dto.IUsuarioFindOneResultDto[];
}

// =============================================================

export const USUARIO_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todos os usuários cadastrados no sistema.',

  gql: {
    name: 'usuarioFindAll',
    returnType: () => UsuarioFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: UsuarioFindAllResultDto,

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
