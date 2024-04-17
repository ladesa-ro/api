import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract } from '../../../../../infrastructure';
import { UsuarioFindOneByIdInputValidationContract } from './usuario-find-one-by-id.input.dto';
import { UsuarioInputDtoValidationContract } from './usuario-input.dto';
import { UsuarioDtoProperties } from './usuario.dto';

// ======================================================

export const UsuarioUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(UsuarioFindOneByIdInputValidationContract())
      .concat(UsuarioInputDtoValidationContract().partial())
      .shape({})
  );
});

// ======================================================

@InputType('UsuarioUpdateInputDto')
export class UsuarioUpdateInputDto implements Dto.IUsuarioUpdateDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME, { required: false })
  nome?: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE, { required: false })
  matriculaSiape?: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL, { required: false })
  email?: string;

  //
}

export class UsuarioUpdateWithoutIdInputDto extends OmitType(UsuarioUpdateInputDto, ['id'] as const) {}
