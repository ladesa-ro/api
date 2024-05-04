import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@Controller('/reservas')
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get('/')
  @Operacao(Spec.ReservaFindAllOperator())
  async reservaFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.ReservaFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IReservaFindAllResultDto> {
    return this.reservaService.reservaFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.ReservaFindOneByIdOperator())
  async reservaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.ReservaFindOneByIdOperator())
    { id }: Spec.IReservaFindOneByIdInputDto,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.ReservaCreateOperator())
  async reservaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.ReservaCreateOperator()) dto: Spec.IReservaInputDto) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.ReservaUpdateOperator())
  async reservaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.ReservaUpdateOperator())
    { id, ...dto }: Spec.IReservaUpdateDto,
  ) {
    const dtoUpdate: Spec.IReservaUpdateDto = {
      ...dto,
      id,
    };

    return this.reservaService.reservaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.ReservaDeleteOperator())
  async reservaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.ReservaFindOneByIdOperator())
    { id }: Spec.IReservaFindOneByIdInputDto,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
