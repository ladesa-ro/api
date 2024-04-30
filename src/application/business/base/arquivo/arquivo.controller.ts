import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoHttp, DtoOperationGetFile, HttpDtoParam } from '../../../../infrastructure';
import { HttpDtoQuery } from '../../../../infrastructure/api-documentate/HttpDtoQuery';
import { ArquivoOperations } from './arquivo.dtos';
import { ArquivoService } from './arquivo.service';

@ApiTags('Arquivos')
@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  @DtoOperationGetFile(ArquivoOperations.ArquivoGetFile)
  async getFile(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ArquivoOperations.ArquivoGetFile, 'id') id: string,
    @HttpDtoQuery(ArquivoOperations.ArquivoGetFile, 'acesso.recurso.nome') acessoRecursoNome: string,
    @HttpDtoQuery(ArquivoOperations.ArquivoGetFile, 'acesso.recurso.id') acessoRecursoId: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(contextoDeAcesso, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}
