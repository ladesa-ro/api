import { UsuarioVinculoCampusSetVinculosInputDto, UsuarioVinculoCampusSetVinculosInputValidationContract } from '.';
import { createDtoOperationOptions } from '../../../../../infrastructure';
import { UsuarioVinculoCampusFindAllResultDto } from './usuario-vinculo-campus-find-all.result.dto';

export const UsuarioVinculoCampusOperations = {
  VINCULO_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os usuários cadastrados no sistema.',

    gql: {
      name: 'vinculoFindAll',
      returnType: () => UsuarioVinculoCampusFindAllResultDto,
    },

    swagger: {
      returnType: UsuarioVinculoCampusFindAllResultDto,
      queries: ['search', 'filter.ativo', 'filter.cargo', 'filter.campus.id', 'filter.usuario.id'],
    },
  }),

  // ===============================

  VINCULO_SET_VINCULOS: createDtoOperationOptions({
    description: 'Altera os vínculos de um determinado usuário em um campus.',

    gql: {
      name: 'vinculoSetVinculos',

      inputDtoType: () => UsuarioVinculoCampusSetVinculosInputDto,
      inputDtoValidationContract: UsuarioVinculoCampusSetVinculosInputValidationContract,

      returnType: () => UsuarioVinculoCampusFindAllResultDto,
    },

    swagger: {
      inputBodyType: UsuarioVinculoCampusSetVinculosInputDto,
      inputBodyValidationContract: UsuarioVinculoCampusSetVinculosInputValidationContract,

      returnType: UsuarioVinculoCampusFindAllResultDto,
    },
  }),

  // ===============================
};
