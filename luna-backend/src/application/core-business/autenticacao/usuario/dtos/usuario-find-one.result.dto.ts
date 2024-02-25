import { ObjectType } from '@nestjs/graphql';
import { IUsuarioFindOneResultDto } from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { UsuarioDtoProperties } from './usuario.dto';

// ======================================================

@ObjectType('UsuarioFindOneResultDto')
export class UsuarioFindOneResultDto implements IUsuarioFindOneResultDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME)
  nome!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE)
  matriculaSiape!: string | null;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL)
  email!: string | null;

  //
}

// ======================================================
