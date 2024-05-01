import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { AmbienteDto, AmbienteDtoValidationContract } from './ambiente.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, getSchemaField, ValidationContractUuid } from '../../../../validacao';

// ======================================================
export const AmbienteFindOneResultDto = createEntityDtoClass(Spec.AmbienteFindOneResultDeclaration, 'output');
export const AmbienteFindOneByIdInputDto = createEntityDtoClass(Spec.AmbienteFindOneByIdInputDeclarationFactory, 'input');
// ======================================================

export const AmbienteFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(AmbienteDtoValidationContract(), 'id'),
  }),
);

// ======================================================

export const AMBIENTE_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um ambiente por ID.',

  gql: {
    name: 'ambienteFindOneById',

    inputDtoType: () => AmbienteFindOneByIdInputDto,
    inputDtoValidationContract: AmbienteFindOneByIdInputValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    returnType: AmbienteFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID do ambiente.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
