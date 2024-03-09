import { ObjectType } from '@nestjs/graphql';
import { IUsuarioFindOneResultDto } from 'application/business/(spec)';
import { DtoProperty, createDtoPropertyMap } from 'infrastructure';
import { IAutenticacaoQuemSouEuResultDto } from '../../(spec)/autenticacao/(dtos)/autenticacao-quem-sou-eu/IAutenticacaoQuemSouEuResultDto';
import { UsuarioDto, UsuarioFindOneResultDto } from '../usuario/dtos';

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
