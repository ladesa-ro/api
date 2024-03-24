import { Injectable } from '@nestjs/common';
import { ReadableStream } from 'stream/web';
import { ArquivoService } from '../arquivo.service';

@Injectable()
export class ImagemService {
  constructor(private arquivoService: ArquivoService) {}

  async saveImagemBlocoCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;

    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemAmbienteCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemUsuarioCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemUsuarioPerfil() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemCursoCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemDiarioCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemDisciplinaCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }

  async saveImagemTurmaCapa() {
    const nome = '';
    const mimeType = '';
    const data = {} as ReadableStream;
    await this.arquivoService.arquivoCreate({ nome, mimeType }, data);
  }
}
