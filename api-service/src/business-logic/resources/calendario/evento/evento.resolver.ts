import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.EventoListOperationInput,
  ) {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EventoFindOneById)
  async eventoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.EventoCreateOperationInput,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EventoUpdateOneById)
  async eventoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoUpdateByIdOperationInput,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EventoDeleteOneById)
  async eventoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoDeleteByIDCombinedInput,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
