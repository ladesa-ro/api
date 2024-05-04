import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { DiarioService } from './diario.service';

@ApiTags('Diarios')
@Controller('/diarios')
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get('/')
  @Operacao(Spec.DiarioFindAllOperator())
  async diarioFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DiarioFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IDiarioFindAllResultDto> {
    return this.diarioService.diarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.DiarioFindOneByIdOperator())
  async diarioFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DiarioFindOneByIdOperator())
    { id }: Spec.IDiarioFindOneByIdInputDto,
  ) {
    return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.DiarioCreateOperator())
  async diarioCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.DiarioCreateOperator()) dto: Spec.IDiarioInputDto) {
    return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.DiarioUpdateOperator())
  async diarioUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DiarioUpdateOperator())
    { id, ...dto }: Spec.IDiarioUpdateDto,
  ) {
    const dtoUpdate: Spec.IDiarioUpdateDto = {
      ...dto,
      id,
    };

    return this.diarioService.diarioUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.DiarioDeleteOperator())
  async diarioDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DiarioFindOneByIdOperator())
    { id }: Spec.IDiarioFindOneByIdInputDto,
  ) {
    return this.diarioService.diarioDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
