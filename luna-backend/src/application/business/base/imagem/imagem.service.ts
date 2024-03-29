import { Injectable, ServiceUnavailableException, UnprocessableEntityException } from '@nestjs/common';
import sharp from 'sharp';
import { SelectQueryBuilder } from 'typeorm';
import { v4 } from 'uuid';
import { DatabaseContextService } from '../../../../infrastructure';
import { ArquivoService } from '../arquivo/arquivo.service';

type ISaveImageOptions = {
  minWidth: number;
  minHeight: number;

  transforms: {
    //
    outputAs: 'jpeg';
  }[];
};

export type IImagemQueryBuilderViewOptions = any;

@Injectable()
export class ImagemService {
  constructor(
    private arquivoService: ArquivoService,
    private databaseContextService: DatabaseContextService,
  ) {}

  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static ImagemQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, _: IImagemQueryBuilderViewOptions = {}) {
    qb.leftJoin(`${alias}.imagemArquivo`, `${alias}_imagemArquivo`);
    qb.leftJoin(`${alias}_imagemArquivo.arquivo`, `${alias}_imagemArquivo_arquivo`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.descricao`,
      //
      `${alias}_imagemArquivo.id`,
      `${alias}_imagemArquivo.largura`,
      `${alias}_imagemArquivo.altura`,
      `${alias}_imagemArquivo.formato`,
      `${alias}_imagemArquivo.mimeType`,
      //
      `${alias}_imagemArquivo_arquivo.id`,
      `${alias}_imagemArquivo_arquivo.nome`,
      `${alias}_imagemArquivo_arquivo.mimeType`,
      `${alias}_imagemArquivo_arquivo.sizeBytes`,
    ]);
  }

  //

  async saveImage(file: Express.Multer.File, options: ISaveImageOptions) {
    const nome = file.originalname;

    // ===============================================

    const originalImage = sharp(file.buffer);

    const metadata = await originalImage.metadata().catch(() => null);

    if (!metadata) {
      throw new UnprocessableEntityException('Formato de imagem não suportada ou inválida.');
    }

    if ((options.minWidth !== null && (!metadata.width || metadata.width < options.minWidth)) || (options.minHeight !== null && (!metadata.height || metadata.height < options.minHeight))) {
      throw new UnprocessableEntityException(`A imagem deve conter largura mínima de ${options.minWidth}px e altura mínima de ${options.minHeight}px.`);
    }

    // ===============================================

    return await this.databaseContextService
      .transaction(async ({ databaseContext: { imagemRepository, imagemArquivoRepository } }) => {
        const imagem = imagemRepository.create();

        imagemRepository.merge(imagem, {
          id: v4(),
          imagemArquivo: [],
        });

        for (const transform of options.transforms) {
          let mimeType: string;
          const transformImage = originalImage.clone().keepMetadata();

          if (transform.outputAs === 'jpeg' || true) {
            transformImage.jpeg();
            mimeType = 'image/jpeg';
          }

          const transformedOutput = await transformImage.toBuffer({ resolveWithObject: true });

          const arquivo = await this.arquivoService.arquivoCreate({ nome, mimeType }, transformedOutput.data);

          const imagemArquivo = imagemArquivoRepository.create();

          imagemArquivoRepository.merge(imagemArquivo, {
            mimeType,
            formato: transform.outputAs,

            largura: metadata.width,
            altura: metadata.height,

            arquivo: {
              id: arquivo.id,
            },
            imagem: {
              id: imagem.id,
            },
          });

          imagem.imagemArquivo.push(imagemArquivo);
        }

        await imagemRepository.save(imagem);

        return {
          imagem: {
            id: imagem.id,
          },
        };
      })
      .catch((err) => {
        console.error(err);
        throw new ServiceUnavailableException();
      });
  }

  async saveBlocoCapa(file: Express.Multer.File) {
    return this.saveImage(file, {
      minWidth: 1,
      minHeight: 1,
      transforms: [
        {
          outputAs: 'jpeg',
        },
      ],
    });
  }
}
