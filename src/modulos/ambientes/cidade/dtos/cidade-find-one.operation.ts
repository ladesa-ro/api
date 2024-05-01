import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { CidadeDto, CidadeDtoValidationContract } from './cidade.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, getSchemaField, ValidationContractId } from '../../../../validacao';

// ======================================================

export const CidadeFindOneResultDto = createEntityDtoClass(Spec.CidadeFindOneResultDeclaration);
export const CidadeFindOneByIdInputDto = createEntityDtoClass(Spec.CidadeFindOneByIdInputDeclaration, 'input');

// ======================================================

export const CidadeFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CidadeDtoValidationContract(), 'id'),
  }),
);

export const CIDADE_FIND_ONE_BY_ID = createDtoOperationOptions({
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
});

// ======================================================