import { Injectable } from '@nestjs/common';
import jetpack, { createReadStream } from 'fs-jetpack';
import { writeFile } from 'node:fs/promises';
import { ReadableStream } from 'node:stream/web';
import { v4 } from 'uuid';
import * as Dto from '../../(spec)';

@Injectable()
export class ArquivoService {
  private get dataFileBasePath() {
    return `/var/data/arquivos`;
  }

  private datGetFilePath(id: Dto.IArquivoModel['id']) {
    jetpack.dir(this.dataFileBasePath);
    return `${this.dataFileBasePath}/${id}`;
  }

  async dataExists(id: Dto.IArquivoModel['id']) {
    const fileFullPath = this.datGetFilePath(id);
    return jetpack.exists(fileFullPath);
  }

  async dataReadAsStream(id: Dto.IArquivoModel['id']) {
    if (await this.dataExists(id)) {
      const fileFullPath = this.datGetFilePath(id);
      const fileReadStream = createReadStream(fileFullPath);
      return fileReadStream;
    }

    return null;
  }

  async dataSave(id: Dto.IArquivoModel['id'], data: NodeJS.ArrayBufferView | ReadableStream) {
    const fileFullPath = this.datGetFilePath(id);
    await writeFile(fileFullPath, data);
    return true;
  }

  async arquivoCreate(dto: Pick<Dto.IArquivoModel, 'nome' | 'mimeType'>, data: NodeJS.ArrayBufferView | ReadableStream) {
    let id: string;

    do {
      id = v4();
    } while (await this.dataExists(id));

    await this.dataSave(id, data);

    return {
      id,
      ...dto,
    };
  }
}
