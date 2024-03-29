import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty } from '../../../../../infrastructure';
import { ArquivoDtoProperties } from './arquivo.dto';

// ======================================================

@ObjectType('ArquivoFindOneResultDto')
export class ArquivoFindOneResultDto implements Dto.IArquivoFindOneResultDto {
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
}

// ======================================================
