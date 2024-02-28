import { createDtoOperationOptions } from '../../../../../infrastructure';
import { BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoInputDto, BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDto } from './bloco.dto';

// ======================================================

export const BLOCO_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de um bloco.',

  gql: {
    name: 'blocoCreate',

    inputDtoType: () => BlocoInputDto,
    inputDtoValidationContract: BlocoInputDtoValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    inputBodyType: BlocoInputDto,
    inputBodyValidationContract: BlocoInputDtoValidationContract,

    returnType: BlocoFindOneResultDto,
  },
});

// ======================================================
