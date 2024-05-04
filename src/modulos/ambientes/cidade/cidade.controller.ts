import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoParam } from '../../../legacy';
import { CidadeService } from './cidade.service';

@ApiTags('Cidades')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get('/')
  @Operacao(Spec.CidadeFindAllOperator())
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.CidadeFindAllOperator()) dto: Spec.IPaginatedInputDto): Promise<Spec.ICidadeFindAllResultDto> {
    return this.cidadeService.findAll(contextoDeAcesso, dto);
  }

  // ========================================================

  @Get('/:id')
  @Operacao(Spec.CidadeFindOneByIdOperator())
  async findById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.CidadeFindOneByIdOperator(), 'id')
    id: number,
  ): Promise<Spec.ICidadeFindOneResultDto> {
    return this.cidadeService.findByIdStrict(contextoDeAcesso, { id });
  }
}
