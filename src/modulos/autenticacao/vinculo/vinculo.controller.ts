import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { VinculoService } from './vinculo.service';

@Controller('/vinculos')
@ApiTags('Vinculos')
export class VinculoController {
  constructor(private vinculoService: VinculoService) {}

  @Get('/')
  @Operacao(Spec.VinculoFindAllOperator())
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery) {
    return this.vinculoService.vinculoFindAll(contextoDeAcesso, query);
  }

  @Post('/')
  @Operacao(Spec.VinculoUpdateOperator())
  async vinculoSetVinculos(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.VinculoUpdateOperator()) dto: Spec.IVinculoUpdateInputDto) {
    return this.vinculoService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
