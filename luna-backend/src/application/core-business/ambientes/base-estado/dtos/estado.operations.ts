import { EstadoFindOneByIdInputDto, EstadoFindOneByIdInputValidationContract, EstadoFindOneByUfInputDto, EstadoFindOneByUfInputValidationContract } from '.';
import { ValidationContractId, createDtoOperationOptions, createValidationContractPickField } from '../../../../../infrastructure';
import { EstadoFindOneResultDto } from './estado-find-one.result.dto';
import { EstadoDto } from './estado.dto';

export const EstadoOperations = {
  ESTADO_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todos os estados brasileiros cadastrados no sistema.',

    gql: {
      name: 'estadoFindAll',
      returnType: () => [EstadoDto],
    },

    swagger: {
      returnType: [EstadoFindOneResultDto],
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
