import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { ArquivoGetFileOperation } from './arquivo.dtos';
import { ArquivoService } from './arquivo.service';
import { DtoOperationGetFile, HttpDtoParam, HttpDtoQuery } from '../../../legacy';

@ApiTags('Arquivos')
@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  @DtoOperationGetFile(ArquivoGetFileOperation)
  async getFile(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ArquivoGetFileOperation, 'id') id: string,
    @HttpDtoQuery(ArquivoGetFileOperation, 'acesso.recurso.nome') acessoRecursoNome: string,
    @HttpDtoQuery(ArquivoGetFileOperation, 'acesso.recurso.id') acessoRecursoId: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(contextoDeAcesso, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}
