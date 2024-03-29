import { Controller, Get, Res, ServiceUnavailableException, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoHttp, DtoOperationFindOne, HttpDtoParam } from '../../../../infrastructure';
import { HttpDtoQuery } from '../../../../infrastructure/api-documentate/HttpDtoQuery';
import { ArquivoService } from './arquivo.service';
import { ArquivoOperations } from './dtos';

@ApiTags('Arquivos')
@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  @DtoOperationFindOne(ArquivoOperations.ARQUIVO_GET_FILE)
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ArquivoOperations.ARQUIVO_GET_FILE, 'id') id: string,
    @HttpDtoQuery(ArquivoOperations.ARQUIVO_GET_FILE, 'acesso.recurso.nome') acessoRecursoNome: string,
    @HttpDtoQuery(ArquivoOperations.ARQUIVO_GET_FILE, 'acesso.recurso.id') acessoRecursoId: string,
  ): Promise<StreamableFile> {
    const file = await this.arquivoService.getFile(contextoDeAcesso, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });

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
