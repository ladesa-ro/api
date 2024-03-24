import { Controller, Get, Param, ParseUUIDPipe, Res, ServiceUnavailableException, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { ArquivoService } from './arquivo.service';

@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  async getFile(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true })
    res: Response,
  ): Promise<StreamableFile> {
    const file = await this.arquivoService.getFile(id);

    if (!file.stream) {
      throw new ServiceUnavailableException();
    }

    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(file.nome ?? file.id)}"`,
    });

    return new StreamableFile(file.stream);
  }
}
