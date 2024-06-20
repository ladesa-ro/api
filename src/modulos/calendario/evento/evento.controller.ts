import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { EventoService } from './evento.service';

@ApiTags('Eventos')
@Controller('/eventos')
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get('/')
  @Operation(LadesaTypings.Tokens.Evento.Operations.List)
  async eventoFindAll(
    @ContextoDeAcessoHttp() clientAccess: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoListCombinedInput,
  ): Promise<LadesaTypings.EventoListCombinedSuccessOutput['body']> {
    return this.eventoService.eventoFindAll(clientAccess, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Evento.Operations.FindById)
  async eventoFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoFindByIDCombinedInput,
  ) {
    return this.eventoService.eventoFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Evento.Operations.Create)
  async eventoCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoCreateCombinedInput,
  ) {
    return this.eventoService.eventoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Evento.Operations.Create)
  async eventoUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoUpdateByIDCombinedInput,
  ) {
    return this.eventoService.eventoUpdate(contextoDeAcesso, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Evento.Operations.DeleteById)
  async eventoDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoDeleteByIDCombinedInput,
  ) {
    return this.eventoService.eventoDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
