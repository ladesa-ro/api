import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../legacy/especificacao';
import { EstadoService } from './estado.service';

@ApiTags('Estados')
@Controller('/base/estados')
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get('/')
  @Operacao(Spec.EstadoFindAllOperator())
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.EstadoFindAllOperator()) dto: Spec.IPaginatedInputDto): Promise<Spec.IEstadoFindAllResultDto> {
    return this.estadoService.findAll(contextoDeAcesso, dto);
  }

  @Get('/uf/:uf')
  @Operacao(Spec.EstadoFindOneByUfOperator())
  async findByUf(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.EstadoFindOneByUfOperator())
    { uf }: Spec.IEstadoFindOneByUfInputDto,
  ) {
    return this.estadoService.findByUfStrict(contextoDeAcesso, { uf });
  }

  @Get('/:id')
  @Operacao(Spec.EstadoFindOneByIdOperator())
  async findById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id') id: number) {
    return this.estadoService.findByIdStrict(contextoDeAcesso, { id });
  }
}
