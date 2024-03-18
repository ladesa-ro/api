import * as yup from 'yup';
import { ValidationContractObjectUuidBase, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { BlocoFindOneByIdInputValidationContract, BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoInputDto, BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDto } from './bloco.dto';

// ======================================================

export const BlocoCreateInputDtoValidationContract = createValidationContract(() => {
  const schema = BlocoInputDtoValidationContract();

  return yup
    .object()
    .concat(BlocoFindOneByIdInputValidationContract())
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

    inputDtoType: () => BlocoInputDto,
    inputDtoValidationContract: BlocoCreateInputDtoValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    inputBodyType: BlocoInputDto,
    inputBodyValidationContract: BlocoCreateInputDtoValidationContract,

    returnType: BlocoFindOneResultDto,
  },
});

// ======================================================
