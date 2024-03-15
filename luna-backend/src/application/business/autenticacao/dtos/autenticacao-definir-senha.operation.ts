import { InputType, ObjectType } from '@nestjs/graphql';
import { IAutenticacaoDefinirSenhaInputDto, IAutenticacaoDefinirSenhaResultDto } from 'application/business/(spec)';
import { DtoProperty, ValidationContractString, createDtoOperationOptions, createDtoPropertyMap, createValidationContract, getSchemaField } from 'infrastructure';
import * as yup from 'yup';
import { UsuarioDtoProperties, UsuarioDtoValidationContract } from '../usuario/dtos';

// ======================================================

export const AutenticacaoDefinirSenhaDtoValidationContract = createValidationContract(() => {
  const usuarioSchema = UsuarioDtoValidationContract();

  return yup.object().shape({
    matriculaSiape: getSchemaField(usuarioSchema, 'matriculaSiape'),
    senha: ValidationContractString().required().nonNullable().min(1),
    confirmarSenha: yup.string().oneOf([yup.ref('senha')], 'A confirmação de senha deve ser igual a senha.'),
  });
});

// ======================================================

export const AutenticacaoDefinirSenhaDtoProperties = createDtoPropertyMap({
  DEFINIR_SENHA_MATRICULA_SIAPE: UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE,

  DEFINIR_SENHA_SENHA: {
    nullable: false,
    description: 'Senha a ser definida.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  DEFINIR_SENHA_CONFIRMAR_SENHA: {
    nullable: false,
    description: 'Confirmação da senha a ser definida.',
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

@InputType('AutenticacaoDefinirSenhaInputDto')
export class AutenticacaoDefinirSenhaInputDto implements IAutenticacaoDefinirSenhaInputDto {
  @DtoProperty(AutenticacaoDefinirSenhaDtoProperties.DEFINIR_SENHA_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(AutenticacaoDefinirSenhaDtoProperties.DEFINIR_SENHA_SENHA)
  senha!: string;

  @DtoProperty(AutenticacaoDefinirSenhaDtoProperties.DEFINIR_SENHA_CONFIRMAR_SENHA)
  confirmarSenha!: string;
}

// ======================================================

export const AutenticacaoDefinirSenhaResultDtoProperties = createDtoPropertyMap({
  DEFINIR_SENHA_RESULT: {
    nullable: true,
    description: 'Resultado da operação.',
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

@ObjectType('AutenticacaoDefinirSenhaResultDto')
export class AutenticacaoDefinirSenhaResultDto implements IAutenticacaoDefinirSenhaResultDto {
  @DtoProperty(AutenticacaoDefinirSenhaResultDtoProperties.DEFINIR_SENHA_RESULT)
  result!: string;
}

// ======================================================

export const AUTENTICACAO_DEFINIR_SENHA = createDtoOperationOptions({
  description: 'Define a primeira senha de um usuário no sistema.',

  gql: {
    name: 'autenticacaoDefinirSenha',

    inputDtoType: () => AutenticacaoDefinirSenhaInputDto,
    inputDtoValidationContract: AutenticacaoDefinirSenhaDtoValidationContract,

    returnType: () => AutenticacaoDefinirSenhaResultDto,
  },

  swagger: {
    inputBodyType: AutenticacaoDefinirSenhaInputDto,
    inputBodyValidationContract: AutenticacaoDefinirSenhaDtoValidationContract,

    returnType: AutenticacaoDefinirSenhaResultDto,
  },
});
