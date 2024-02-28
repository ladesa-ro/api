import { InputType } from '@nestjs/graphql';
import { IUsuarioInputDto } from 'application/business/(dtos)';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { UsuarioDtoProperties, UsuarioDtoValidationContract } from './usuario.dto';

// ======================================================

export const UsuarioInputDtoValidationContract = createValidationContract(() => {
  const schema = UsuarioDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    matriculaSiape: getSchemaField(schema, 'matriculaSiape'),
    email: getSchemaField(schema, 'email'),
  });
});

// ======================================================

@InputType('UsuarioInputDto')
export class UsuarioInputDto implements IUsuarioInputDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME)
  nome!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL)
  email!: string;
}
