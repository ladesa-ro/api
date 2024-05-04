import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArquivoGetFileOperator } from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { ArquivoService } from './arquivo.service';

@ApiTags('Arquivos')
@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  @Operacao(ArquivoGetFileOperator())
  async getFile(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id') id: string,
    @Query('acesso.recurso.id') acessoRecursoId: string,
    @Query('acesso.recurso.nome') acessoRecursoNome: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(contextoDeAcesso, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}
