import {
  UsuarioDeleteOneByIdInputDto,
  UsuarioDeleteOneByIdInputValidationContract,
  UsuarioFindOneByIdInputDto,
  UsuarioFindOneByIdInputValidationContract,
  UsuarioInputDto,
  UsuarioInputDtoValidationContract,
  UsuarioUpdateInputDto,
  UsuarioUpdateInputDtoValidationContract,
  UsuarioUpdateWithoutIdInputDto,
} from '.';
import { ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { UsuarioFindOneResultDto } from './usuario-find-one.result.dto';
import { USUARIO_GET_IMAGEM_CAPA } from './usuario-get-imagem-capa.operation';
import { USUARIO_GET_IMAGEM_PERFIL } from './usuario-get-imagem-perfil.operation';
import { UsuarioDto } from './usuario.dto';

export const UsuarioOperations = {
  // ===============================
  USUARIO_GET_IMAGEM_CAPA: USUARIO_GET_IMAGEM_CAPA,
  // ===============================
  USUARIO_GET_IMAGEM_PERFIL: USUARIO_GET_IMAGEM_PERFIL,
  // ===============================

  USUARIO_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os usuários cadastrados no sistema.',

    gql: {
      name: 'usuarioFindAll',
      returnType: () => [UsuarioDto],
    },

    swagger: {
      returnType: [UsuarioFindOneResultDto],
    },
  }),

  // ===============================

  USUARIO_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um usuário por ID.',

    gql: {
      name: 'usuarioFindOneById',

      inputDtoType: () => UsuarioFindOneByIdInputDto,
      inputDtoValidationContract: UsuarioFindOneByIdInputValidationContract,

      returnType: () => UsuarioDto,
    },

    swagger: {
      returnType: UsuarioFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID do usuário.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================

  USUARIO_CREATE: createDtoOperationOptions({
    description: 'Realiza o cadastro de um usuário.',

    gql: {
      name: 'usuarioCreate',

      inputDtoType: () => UsuarioInputDto,
      inputDtoValidationContract: UsuarioInputDtoValidationContract,

      returnType: () => UsuarioDto,
    },

    swagger: {
      inputBodyType: UsuarioInputDto,
      inputBodyValidationContract: UsuarioInputDtoValidationContract,

      returnType: UsuarioFindOneResultDto,
    },
  }),

  // ===============================

  USUARIO_UPDATE: createDtoOperationOptions({
    description: 'Realiza a alteração de um usuário.',

    gql: {
      name: 'usuarioUpdate',

      inputDtoType: () => UsuarioUpdateInputDto,
      inputDtoValidationContract: UsuarioUpdateInputDtoValidationContract,

      returnType: () => UsuarioDto,
    },

    swagger: {
      inputBodyType: UsuarioUpdateWithoutIdInputDto,

      inputBodyValidationContract: createValidationContract(() => UsuarioUpdateInputDtoValidationContract().omit(['id'])),

      params: [
        {
          name: 'id',
          description: 'ID do usuário.',
          validationContract: ValidationContractUuid,
        },
      ],

      returnType: UsuarioFindOneResultDto,
    },
  }),

  // ===============================

  USUARIO_DELETE_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a remoção de um usuário por ID.',

    gql: {
      name: 'usuarioDeleteOneById',

      inputDtoType: () => UsuarioDeleteOneByIdInputDto,
      inputDtoValidationContract: UsuarioDeleteOneByIdInputValidationContract,

      returnType: () => Boolean,
    },

    swagger: {
      returnType: Boolean,

      params: [
        {
          name: 'id',
          description: 'ID do usuario.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================
};
