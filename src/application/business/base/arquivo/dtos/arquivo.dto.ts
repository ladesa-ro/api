import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import {
  CommonPropertyInteger,
  CommonPropertyString,
  CommonPropertyUuid,
  DtoProperty,
  ValidationContractNumber,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';

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

@ObjectType('Arquivo')
export class ArquivoDto implements Dto.IArquivoModel {
  @DtoProperty(ArquivoDtoProperties.ARQUIVO_ID)
  id!: string;

  //

  @DtoProperty(ArquivoDtoProperties.ARQUIVO_NOME)
  nome!: string | null;

  @DtoProperty(ArquivoDtoProperties.ARQUIVO_MIME_TYPE)
  mimeType!: string | null;

  @DtoProperty(ArquivoDtoProperties.ARQUIVO_SIZE_BYTES)
  sizeBytes!: number | null;

  @DtoProperty(ArquivoDtoProperties.ARQUIVO_STORAGE_TYPE)
  storageType!: string | null;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
