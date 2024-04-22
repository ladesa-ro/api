import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractId, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CidadeDto, CidadeDtoValidationContract } from './cidade.dto';

// ======================================================

export const CidadeFindOneResultDto = createEntityDtoClass(Spec.CidadeFindOneByIdResultDeclaration);
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
