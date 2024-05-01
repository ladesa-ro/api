import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDto } from './bloco.dto';
import { createDtoOperationOptions } from '../../../../documentacao/api-documentate';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';
import { createValidationContract, ValidationContractObjectUuidBase } from '../../../../infraestrutura/validation';

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
