import { Controller, Get, StreamableFile } from '@nestjs/common';
import { ApiProduces, ApiTags } from '@nestjs/swagger';
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
  @ApiProduces('application/octet-stream')
  @DtoOperationFindOne(ArquivoOperations.ARQUIVO_GET_FILE)
  async getFile(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ArquivoOperations.ARQUIVO_GET_FILE, 'id') id: string,
    @HttpDtoQuery(ArquivoOperations.ARQUIVO_GET_FILE, 'acesso.recurso.nome') acessoRecursoNome: string,
    @HttpDtoQuery(ArquivoOperations.ARQUIVO_GET_FILE, 'acesso.recurso.id') acessoRecursoId: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(contextoDeAcesso, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}
