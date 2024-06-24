import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { Operation } from '../../../helpers/ladesa';
import { ArquivoService } from './arquivo.service';

@ApiTags('Arquivos')
@Controller('/arquivos')
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(':id')
  @Operation(LadesaTypings.Tokens.Arquivo.Operations.GetFile)
  async getFile(
    @AccessContextHttp() accessContext: AccessContext,

    @Param('id') id: string,
    @Query('acesso.recurso.id') acessoRecursoId: string,
    @Query('acesso.recurso.nome') acessoRecursoNome: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(accessContext, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}
