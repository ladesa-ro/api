import { InputType } from '@nestjs/graphql';
import { IAutenticacaoDefinirSenhaInputDto } from 'application/core-business/(dtos)';
import { DtoProperty, ValidationContractString, createDtoPropertyMap, createValidationContract, getSchemaField } from 'infrastructure';
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
