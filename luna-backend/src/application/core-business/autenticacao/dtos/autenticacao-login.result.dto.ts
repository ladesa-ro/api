import { Int, ObjectType } from '@nestjs/graphql';
import { IAutenticacaoLoginResultDto } from 'application/core-business/(dtos)';
import { DtoProperty, createDtoPropertyMap } from 'infrastructure';

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
export class AutenticacaoLoginResultDto implements IAutenticacaoLoginResultDto {
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
