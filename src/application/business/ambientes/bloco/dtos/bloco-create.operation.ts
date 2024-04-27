import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDto } from './bloco.dto';

// ======================================================
export const BlocoCreateDto = createEntityDtoClass(Spec.BlocoCreateDeclaration, 'input');
// ======================================================

export const BlocoCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = BlocoInputDtoValidationContract();

  return yup
    .object()
    .concat(schema.pick(['nome', 'codigo']))
    .shape({
      campus: ValidationContractObjectUuidBase({ required: true, optional: false }),
    });
});

// ======================================================

export const BLOCO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um bloco.',

  gql: {
    name: 'blocoCreate',

    inputDtoType: () => BlocoCreateDto,
    inputDtoValidationContract: BlocoCreateInputDtoValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    inputBodyType: BlocoCreateDto,
    inputBodyValidationContract: BlocoCreateInputDtoValidationContract,
    returnType: BlocoFindOneResultDto,
  },
});

// ======================================================
