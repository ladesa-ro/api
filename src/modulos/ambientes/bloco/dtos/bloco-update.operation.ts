import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { BlocoFindOneByIdInputValidationContract, BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDto } from './bloco.dto';
import { createDtoOperationOptions } from '../../../../legacy';
import { createValidationContract, ValidationContractObjectUuidBase, ValidationContractUuid } from '../../../../validacao';

// ======================================================
export const BlocoUpdateInputDto = createEntityDtoClass(Spec.BlocoUpdateDeclaration, 'input');
// ======================================================

export const BlocoUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = BlocoInputDtoValidationContract();

  return yup
    .object()
    .concat(BlocoFindOneByIdInputValidationContract())
    .concat(schema.pick(['nome', 'codigo']).partial())
    .shape({
      campus: ValidationContractObjectUuidBase({ required: true, optional: true }),
    });
});

// ======================================================

export const BLOCO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de um bloco.',

  gql: {
    name: 'blocoUpdate',

    inputDtoType: () => BlocoUpdateInputDto,
    inputDtoValidationContract: BlocoUpdateInputDtoValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    inputBodyType: BlocoUpdateInputDto,

    inputBodyValidationContract: createValidationContract(() => BlocoUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: BlocoFindOneResultDto,
  },
});
