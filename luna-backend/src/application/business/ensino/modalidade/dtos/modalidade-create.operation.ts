// ======================================================

import { createDtoOperationOptions } from "infrastructure";
import { ModalidadeFindOneResultDto } from "./modalidade-find-one.operation";
import { ModalidadeInputDto, ModalidadeInputDtoValidationContract } from "./modalidade-input-dto";
import { ModalidadeDto } from "./modalidade.dto";

export const MODALIDADE_CREATE = createDtoOperationOptions({
  description: 'Realiza o cadastro de uma modalidade.',

  gql: {
    name: 'modalidadeCreate',

    inputDtoType: () => ModalidadeInputDto,
    inputDtoValidationContract: ModalidadeInputDtoValidationContract,

    returnType: () => ModalidadeDto,
  },

  swagger: {
    inputBodyType: ModalidadeInputDto,
    inputBodyValidationContract: ModalidadeInputDtoValidationContract,

    returnType: ModalidadeFindOneResultDto,
  },
});


