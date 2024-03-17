import { ObjectType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { ICampusFindOneResultDto, IUsuarioFindOneResultDto, IUsuarioFindOneResultDtoVinculoAtivo } from '../../../(spec)';
import { DtoProperty, createDtoPropertyMap } from '../../../../../infrastructure';
import { CampusFindOneResultDto } from '../../../ambientes/campus/dtos';
import { UsuarioVinculoCampusDto, UsuarioVinculoCampusDtoProperties, UsuarioVinculoCampusFindOneResultDto } from '../../usuario-vinculo-campus/dtos';
import { UsuarioDtoProperties } from './usuario.dto';

// ======================================================

export class UsuarioFindOneResultDtoVinculoAtivoCampus extends PickType(CampusFindOneResultDto, ['id', 'nomeFantasia', 'razaoSocial', 'apelido'] as const) {}

export class UsuarioFindOneResultDtoVinculoAtivo extends PickType(UsuarioVinculoCampusFindOneResultDto, ['id', 'ativo', 'cargo'] as const) {
  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CAMPUS_OUTPUT, {
    swagger: {
      type: UsuarioFindOneResultDtoVinculoAtivoCampus,
    },
  })
  campus!: ICampusFindOneResultDto;
}

export const UsuarioFindOneDtoProperties = createDtoPropertyMap({
  USUARIO_VINCULOS_ATIVOS_OUTPUT: {
    nullable: false,
    description: 'Vínculos ativos do usuário.',
    //
    gql: {
      type: () => UsuarioVinculoCampusDto,
    },
    swagger: {
      type: UsuarioFindOneResultDtoVinculoAtivo,
    },
  },
});

@ObjectType('UsuarioFindOneResultDto')
export class UsuarioFindOneResultDto implements IUsuarioFindOneResultDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME)
  nome!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL)
  email!: string;

  //

  @DtoProperty(UsuarioFindOneDtoProperties.USUARIO_VINCULOS_ATIVOS_OUTPUT)
  vinculosAtivos!: IUsuarioFindOneResultDtoVinculoAtivo[];

  //
}

// ======================================================
