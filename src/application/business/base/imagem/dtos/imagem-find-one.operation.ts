import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { IImagemArquivoFindOneResultDto } from '../../../(spec)/base/imagem-arquivo/operations';
import { DtoProperty } from '../../../../../infrastructure';
import { ImagemDtoProperties } from './imagem.dto';

// ======================================================

@ObjectType('ImagemFindOneResultDto')
export class ImagemFindOneResultDto implements Dto.IImagemFindOneResultDto {
  @DtoProperty(ImagemDtoProperties.IMAGEM_ID)
  id!: string;

  //

  @DtoProperty(ImagemDtoProperties.IMAGEM_DESCRICAO)
  descricao!: string | null;

  @DtoProperty(ImagemDtoProperties.IMAGEM_IMAGEM_ARQUIVO_OUTPUT)
  imagemArquivo!: Omit<IImagemArquivoFindOneResultDto, 'imagem'>[];
}

// ======================================================
