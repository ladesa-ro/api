import { PaginatedOptionsInputDto, PaginateOptionsInputValidationContract } from 'application/core-business/common.dto';
import { EstadoFindOneByIdInputDto, EstadoFindOneByIdInputValidationContract, EstadoFindOneByUfInputDto, EstadoFindOneByUfInputValidationContract } from '.';
import { createDtoOperationOptions, createValidationContractPickField, ValidationContractId } from '../../../../../infrastructure';
import { EstadoFindAllResultDto } from './estado-find-all.result.dto';
import { EstadoFindOneResultDto } from './estado-find-one.result.dto';
import { EstadoDto } from './estado.dto';

export const EstadoOperations = {
  ESTADO_FIND_ALL: createDtoOperationOptions({
    description: 'Listagem de todos os estados brasileiros cadastrados no sistema.',

    gql: {
      name: 'estadoFindAll',
      returnType: () => EstadoFindAllResultDto,

      inputNullable: true,
      inputDtoType: () => PaginatedOptionsInputDto,
      inputDtoValidationContract: PaginateOptionsInputValidationContract,
    },

    swagger: {
      returnType: EstadoFindAllResultDto,
      queries: ['search', 'sortBy'],
    },
  }),

  // ===============================

  ESTADO_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um estado por ID IBGE do estado.',

    gql: {
      name: 'estadoFindOneById',

      inputDtoType: () => EstadoFindOneByIdInputDto,
      inputDtoValidationContract: EstadoFindOneByIdInputValidationContract,

      returnType: () => EstadoDto,
    },

    swagger: {
      returnType: EstadoFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID IBGE do estado.',
          validationContract: ValidationContractId,
        },
      ],
    },
  }),

  // ===============================

  ESTADO_FIND_ONE_BY_UF: createDtoOperationOptions({
    description: 'Realiza a consulta a um estado por sigla da UF.',

    gql: {
      name: 'estadoFindOneByUf',

      inputDtoType: () => EstadoFindOneByUfInputDto,
      inputDtoValidationContract: EstadoFindOneByUfInputValidationContract,

      returnType: () => EstadoDto,
    },

    swagger: {
      returnType: EstadoFindOneResultDto,

      params: [
        {
          name: 'uf',
          description: 'Sigla UF do estado.',
          validationContract: createValidationContractPickField(EstadoFindOneByUfInputValidationContract, 'uf'),
        },
      ],
    },
  }),
};
