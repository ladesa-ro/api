import { CidadeFindOneByIdInputDto, CidadeFindOneByIdInputValidationContract } from '.';
import { ValidationContractId, createDtoOperationOptions } from '../../../../../infrastructure';
import { CidadeFindOneResultDto } from './cidade-find-one.result.dto';
import { CidadeDto } from './cidade.dto';

// ======================================================

export const CidadeOperations = {
  //

  CIDADE_FIND_ALL: createDtoOperationOptions({
    description: 'Lista de todas as cidades brasileiras cadastradas no sistema.',

    gql: {
      name: 'cidadeFindAll',
      returnType: () => [CidadeDto],
    },

    swagger: {
      returnType: [CidadeFindOneResultDto],
    },
  }),

  //

  CIDADE_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Retorna a consulta a uma cidade por ID IBGE.',

    gql: {
      name: 'cidadeFindOneById',
      returnType: () => CidadeDto,

      inputDtoType: () => CidadeFindOneByIdInputDto,
      inputDtoValidationContract: CidadeFindOneByIdInputValidationContract,
    },

    swagger: {
      returnType: CidadeFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID IBGE da Cidade.',
          validationContract: ValidationContractId,
        },
      ],
    },
  }),

  //
};

// ======================================================
