import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { EventoService } from './evento.service';

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.List)
  async eventoFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoListCombinedInput,
  ) {
    return this.eventoService.eventoFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.FindById)
  async eventoFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoFindByIDCombinedInput,
  ) {
    return this.eventoService.eventoFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.Create)
  async eventoCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoCreateCombinedInput,
  ) {
    return this.eventoService.eventoCreate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.Create)
  async eventoUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoUpdateByIDCombinedInput,
  ) {
    return this.eventoService.eventoUpdate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.DeleteById)
  async eventoDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EventoDeleteByIDCombinedInput,
  ) {
    return this.eventoService.eventoDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
