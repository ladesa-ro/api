import { InputType } from '@nestjs/graphql';
import { IAutenticacaoLoginInputDto } from 'application/core-business/(dtos)/autenticacao/(dtos)/autenticacao-login/IAutenticacaoLoginInputDto';
import { DtoProperty, ValidationContractString, createDtoPropertyMap, createValidationContract, getSchemaField } from 'infrastructure';
import * as yup from 'yup';
import { UsuarioDtoProperties, UsuarioDtoValidationContract } from '../usuario/dtos';

// ======================================================

export const AutenticacaoLoginDtoValidationContract = createValidationContract(() => {
  const usuarioSchema = UsuarioDtoValidationContract();

  return yup.object().shape({
    matriculaSiape: getSchemaField(usuarioSchema, 'matriculaSiape'),
    senha: ValidationContractString().required().nonNullable().min(1),
  });
});

// ======================================================

export const AutenticacaoLoginDtoProperties = createDtoPropertyMap({
  LOGIN_MATRICULA_SIAPE: UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE,

  LOGIN_SENHA: {
    nullable: false,
    description: 'Senha.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
});

// ======================================================

@InputType('AutenticacaoLoginInputDto')
export class AutenticacaoLoginInputDto implements IAutenticacaoLoginInputDto {
  @DtoProperty(AutenticacaoLoginDtoProperties.LOGIN_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(AutenticacaoLoginDtoProperties.LOGIN_SENHA)
  senha!: string;
}
