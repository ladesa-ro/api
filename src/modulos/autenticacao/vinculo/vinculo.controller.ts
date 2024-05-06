import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { VinculoService } from './vinculo.service';

@Controller('/vinculos')
@ApiTags('Vinculos')
export class VinculoController {
  constructor(private vinculoService: VinculoService) {}

  @Get('/')
  @Operacao(Spec.VinculoFindAllOperator())
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.VinculoFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    return this.vinculoService.vinculoFindAll(contextoDeAcesso, dto);
  }

  @Post('/')
  @Operacao(Spec.VinculoUpdateOperator())
  async vinculoSetVinculos(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.VinculoUpdateOperator()) dto: Spec.IVinculoUpdateInputDto) {
    return this.vinculoService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
