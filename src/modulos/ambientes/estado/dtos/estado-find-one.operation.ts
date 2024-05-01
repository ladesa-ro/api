import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { EstadoDto, EstadoDtoValidationContract } from './estado.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, getSchemaField, ValidationContractId, createValidationContractPickField } from '../../../../validacao';

// ======================================================

export const EstadoFindOneResultDto = createEntityDtoClass(Spec.EstadoFindOneResultDeclaration);
export const EstadoFindOneByIdInputDto = createEntityDtoClass(Spec.EstadoFindOneByIdInputDeclaration, 'input');
export const EstadoFindOneByUfInputDto = createEntityDtoClass(Spec.EstadoFindOneByUfInputDeclaration, 'input');

// ======================================================

export const EstadoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(EstadoDtoValidationContract(), 'id'),
  }),
);

// ================

export const ESTADO_FIND_ONE_BY_ID = createDtoOperationOptions({
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
});

// ======================================================

export const EstadoFindOneByUfInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    uf: getSchemaField(EstadoDtoValidationContract(), 'sigla'),
  }),
);

// ================

export const ESTADO_FIND_ONE_BY_UF = createDtoOperationOptions({
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
});

// ======================================================
