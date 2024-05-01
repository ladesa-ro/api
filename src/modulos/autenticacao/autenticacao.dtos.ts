import { InputType, Int, ObjectType } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { IAutenticacaoDefinirSenhaInputDto, IAutenticacaoDefinirSenhaResultDto, IAutenticacaoQuemSouEuResultDto, IUsuarioFindOneResultDto } from '@sisgea/spec';
import * as yup from 'yup';
import { UsuarioDto, UsuarioDtoProperties, UsuarioDtoValidationContract, UsuarioFindOneResultDto } from './usuario/usuario.dtos';
import { createDtoPropertyMap, DtoProperty, createDtoOperationOptions } from '../../legacy';
import { createValidationContract, getSchemaField, ValidationContractString } from '../../validacao';

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
export class AutenticacaoLoginInputDto implements Spec.IAutenticacaoLoginInputDto {
  @DtoProperty(AutenticacaoLoginDtoProperties.LOGIN_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(AutenticacaoLoginDtoProperties.LOGIN_SENHA)
  senha!: string;
}

// ======================================================

export const AutenticacaoLoginResultDtoProperties = createDtoPropertyMap({
  LOGIN_RESULT_ACCESS_TOKEN: {
    nullable: true,
    description: 'Token de acesso.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  LOGIN_RESULT_TOKEN_TYPE: {
    nullable: true,
    //
    description: 'Tipo de token de acesso.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  LOGIN_RESULT_ID_TOKEN: {
    nullable: true,
    description: 'ID token.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  LOGIN_RESULT_REFRESH_TOKEN: {
    nullable: true,
    description: 'Refresh token.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  LOGIN_RESULT_EXPIRES_IN: {
    nullable: true,
    description: 'Quanto tempo para expirar o token (em segundos).',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  LOGIN_RESULT_EXPIRES_AT: {
    nullable: true,
    description: 'Data de expiração (em segundos unix).',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  LOGIN_RESULT_SESSION_STATE: {
    nullable: true,
    description: 'Estado da sessão.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  LOGIN_RESULT_SCOPE: {
    nullable: true,
    description: 'Escopo do token de acesso.',
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

@ObjectType('AutenticacaoLoginResultDto')
export class AutenticacaoLoginResultDto implements Spec.IAutenticacaoLoginResultDto {
  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_ACCESS_TOKEN)
  access_token!: string | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_TOKEN_TYPE)
  token_type!: string | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_ID_TOKEN)
  id_token!: string | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_REFRESH_TOKEN)
  refresh_token!: string | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_EXPIRES_IN)
  expires_in!: number | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_EXPIRES_AT)
  expires_at!: number | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_SESSION_STATE)
  session_state!: string | null;

  @DtoProperty(AutenticacaoLoginResultDtoProperties.LOGIN_RESULT_SCOPE)
  scope!: string | null;
}

// ======================================================

export const AUTENTICACAO_LOGIN = createDtoOperationOptions({
  description: 'Realiza o login no sistema e retorna as credenciais de acesso.',

  gql: {
    name: 'autenticacaoLogin',

    inputDtoType: () => AutenticacaoLoginInputDto,
    inputDtoValidationContract: AutenticacaoLoginDtoValidationContract,

    returnType: () => AutenticacaoLoginResultDto,
  },

  swagger: {
    inputBodyType: AutenticacaoLoginInputDto,
    inputBodyValidationContract: AutenticacaoLoginDtoValidationContract,
    returnType: AutenticacaoLoginResultDto,
  },
});

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

// ======================================================

export const AutenticacaoRefreshDtoValidationContract = createValidationContract(() => {
  return yup.object().shape({
    refreshToken: ValidationContractString().required().nonNullable().min(5),
  });
});

// ======================================================

export const AutenticacaoRefreshDtoProperties = createDtoPropertyMap({
  REFRESH_REFRESH_TOKEN: {
    nullable: false,
    description: 'Refresh token.',
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

@InputType('AutenticacaoRefreshInputDto')
export class AutenticacaoRefreshInputDto implements Spec.IAutenticacaoRefreshInputDto {
  @DtoProperty(AutenticacaoRefreshDtoProperties.REFRESH_REFRESH_TOKEN)
  refreshToken!: string;
}

// ======================================================

export const AUTENTICACAO_REFRESH = createDtoOperationOptions({
  description: 'Realiza o login por meio do refreshToken no sistema e retorna as credenciais de acesso.',

  gql: {
    name: 'autenticacaoLogin',

    inputDtoType: () => AutenticacaoRefreshInputDto,
    inputDtoValidationContract: AutenticacaoRefreshDtoValidationContract,

    returnType: () => AutenticacaoLoginResultDto,
  },

  swagger: {
    inputBodyType: AutenticacaoRefreshInputDto,
    inputBodyValidationContract: AutenticacaoRefreshDtoValidationContract,

    returnType: AutenticacaoLoginResultDto,
  },
});

export const AutenticacaoOperations = {
  // ===============================
  AUTENTICACAO_QUEM_SOU_EU: AUTENTICACAO_QUEM_SOU_EU,
  // ===============================
  AUTENTICACAO_LOGIN: AUTENTICACAO_LOGIN,
  // ===============================
  AUTENTICACAO_REFRESH: AUTENTICACAO_REFRESH,
  // ===============================
  AUTENTICACAO_DEFINIR_SENHA: AUTENTICACAO_DEFINIR_SENHA,
  // ===============================
};
