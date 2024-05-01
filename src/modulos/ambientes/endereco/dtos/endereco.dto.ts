import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import {
  ValidationContractLocalizacaoCep,
  ValidationContractNumber,
  ValidationContractObjectId,
  ValidationContractString,
  ValidationContractUuid,
  createValidationContract,
} from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';

// ======================================================

export const EnderecoDtoValidationContract = createValidationContract(() => {
  return yup.object().shape({
    id: ValidationContractUuid(),

    //

    cep: ValidationContractLocalizacaoCep().required().nonNullable(),
    logradouro: ValidationContractString().required().nonNullable(),
    numero: ValidationContractNumber().integer().positive(),
    bairro: ValidationContractString().required().nonNullable(),

    complemento: ValidationContractString()
      .nullable()
      .default(() => null),
    pontoReferencia: ValidationContractString()
      .nullable()
      .default(() => null),

    cidade: ValidationContractObjectId({ required: true }).defined().required(),
  });
});

// ======================================================

export const EnderecoDto = createEntityDtoClass(Spec.EnderecoDeclarationFactory, 'output');

// ======================================================
