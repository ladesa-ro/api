import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { IImagemArquivoFindOneResultDto } from '@sisgea/spec';
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
