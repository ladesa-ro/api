import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { DtoProperty } from '../../../../../infrastructure';
import { ImagemArquivoDtoProperties } from './imagem-arquivo.dto';

// ======================================================

@ObjectType('ImagemArquivoFindOneResultDto')
export class ImagemArquivoFindOneResultDto implements Dto.IImagemArquivoFindOneResultDto {
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_ID)
  id!: string;

  //
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_LARGURA)
  largura!: number;
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_ALTURA)
  altura!: number;
  //
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_FORMATO)
  formato!: string;
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_MIME_TYPE)
  mimeType!: string;
  //

  //
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_IMAGEM_OUTPUT)
  imagem!: Dto.IImagemModel;
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_ARQUIVO_OUTPUT)
  arquivo!: Dto.IArquivoModel;
  //
}

// ======================================================
