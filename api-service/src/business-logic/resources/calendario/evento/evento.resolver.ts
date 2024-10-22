import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { EventoService } from "./evento.service";

@Resolver()
export class EventoResolver {
  constructor(private eventoService: EventoService) {}
  //
  @PocOperation(PocTokens.EventoList)
  async eventoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoListCombinedInput,
  ) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EventoFindOneByID)
  async eventoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoFindByIDCombinedInput,
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.EventoCreate)
  async eventoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoCreateCombinedInput,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EventoUpdateOneByID)
  async eventoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoUpdateByIDCombinedInput,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EventoDeleteOneByID)
  async eventoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EventoDeleteByIDCombinedInput,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
