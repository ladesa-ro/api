import { Controller, Get, Param, ParseUUIDPipe, Query, Res, ServiceUnavailableException, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoHttp } from '../../../../infrastructure';
import { ArquivoService } from './arquivo.service';

@ApiTags('Arquivos')
@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  async getFile(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    //
    @Res({ passthrough: true })
    res: Response,
    //
    @Query('acesso') acesso: any,
  ): Promise<StreamableFile> {
    const file = await this.arquivoService.getFile(contextoDeAcesso, id, acesso);

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
