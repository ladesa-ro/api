import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { EventoService } from './evento.service';

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.List)
  async eventoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoListCombinedInput,
  ) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.FindById)
  async eventoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoFindByIDCombinedInput,
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.Create)
  async eventoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoCreateCombinedInput,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.UpdateById)
  async eventoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoUpdateByIDCombinedInput,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Evento.Operations.DeleteById)
  async eventoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoDeleteByIDCombinedInput,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
