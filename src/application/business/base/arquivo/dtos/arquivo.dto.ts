import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import {
  CommonPropertyInteger,
  CommonPropertyString,
  CommonPropertyUuid,
  ValidationContractNumber,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import { createEntityDtoClass } from '../../../../../infrastructure/utils/createDtoClass';

// ======================================================

export const ArquivoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    //
    nome: ValidationContractString().nullable(),
    mimeType: ValidationContractString().nullable(),
    //
    sizeBytes: ValidationContractNumber().integer().positive().required().nullable(),
    storageType: ValidationContractString().nullable(),
  });
});

// ======================================================

export const ArquivoDtoProperties = createDtoPropertyMap({
  ARQUIVO_ID: CommonPropertyUuid('ID do arquivo'),

  //

  ARQUIVO_NOME: CommonPropertyString('Nome do arquivo', true),
  ARQUIVO_MIME_TYPE: CommonPropertyString('Mime-type do arquivo', true),
  ARQUIVO_SIZE_BYTES: CommonPropertyInteger('Tamanho do arquivo (em bytes)', true),
  ARQUIVO_STORAGE_TYPE: CommonPropertyString('Estratégia de armazenamento do arquivo', true),
});

// ======================================================

export const ArquivoDto = createEntityDtoClass(Spec.ArquivoDeclarationFactory);

// ======================================================
