import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { ReservaService } from './reserva.service';

@ApiTags('Reservas')
@Controller('/reservas')
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.List)
  async reservaFindAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaListCombinedInput,
  ): Promise<LadesaTypings.ReservaListCombinedSuccessOutput['body']> {
    return this.reservaService.reservaFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.FindById)
  async reservaFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaCreateCombinedInput,
  ) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIDCombinedInput,
  ) {
    return this.reservaService.reservaUpdate(contextoDeAcesso, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Reserva.Operations.DeleteById)
  async reservaDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
