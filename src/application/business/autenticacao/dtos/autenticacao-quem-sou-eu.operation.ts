import { ObjectType } from '@nestjs/graphql';
import { IAutenticacaoQuemSouEuResultDto, IUsuarioFindOneResultDto } from '@sisgea/spec';
import { DtoProperty, createDtoOperationOptions, createDtoPropertyMap } from 'infrastructure';
import { UsuarioDto, UsuarioFindOneResultDto } from '../usuario/usuario.dtos';

// ======================================================

export const AutenticacaoQuemSouEuResultDtoProperties = createDtoPropertyMap({
  QUEM_SOU_EU_USUARIO_OUTPUT: {
    nullable: true,
    description: 'Nulo, caso não autenticado, ou um objeto com as informações sobre o usuário.',
    //
    gql: {
      type: () => UsuarioDto,
    },
    swagger: {
      type: UsuarioFindOneResultDto,
    },
  },
});

// ======================================================

@ObjectType('AutenticacaoQuemSouEuResultDto')
export class AutenticacaoQuemSouEuResultDto implements IAutenticacaoQuemSouEuResultDto {
  @DtoProperty(AutenticacaoQuemSouEuResultDtoProperties.QUEM_SOU_EU_USUARIO_OUTPUT)
  usuario!: IUsuarioFindOneResultDto | null;
}

// ======================================================

export const AUTENTICACAO_QUEM_SOU_EU = createDtoOperationOptions({
  description: 'Retorna as informações sobre o usuário logado no sistema.',

  gql: {
    name: 'authQuemSouEu',
    returnType: () => AutenticacaoQuemSouEuResultDto,
  },

  swagger: {
    returnType: AutenticacaoQuemSouEuResultDto,
  },
});

// ======================================================
