import { createDtoOperationOptions } from 'infrastructure';
import { AutenticacaoDefinirSenhaDtoValidationContract, AutenticacaoDefinirSenhaInputDto, AutenticacaoLoginDtoValidationContract, AutenticacaoLoginInputDto } from '.';
import { AutenticacaoDefinirSenhaResultDto } from './autenticacao-definir-senha.result.dto';
import { AutenticacaoLoginResultDto } from './autenticacao-login.result.dto';
import { AutenticacaoQuemSouEuResultDto } from './autenticacao-quem-sou-eu.result.dto';

export const AutenticacaoOperations = {
  // ===============================

  AUTENTICACAO_QUEM_SOU_EU: createDtoOperationOptions({
    description: 'Retorna as informações sobre o usuário logado no sistema.',

    gql: {
      name: 'authQuemSouEu',
      returnType: () => AutenticacaoQuemSouEuResultDto,
    },

    swagger: {
      returnType: AutenticacaoQuemSouEuResultDto,
    },
  }),

  // ===============================

  AUTENTICACAO_LOGIN: createDtoOperationOptions({
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
  }),

  // ===============================

  AUTENTICACAO_DEFINIR_SENHA: createDtoOperationOptions({
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
  }),

  // ===============================
};
