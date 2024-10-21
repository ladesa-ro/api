import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventoService } from "./evento.service";

@ApiTags("Eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  @PocOperation(PocTokens.EventoList)
  async eventoFindAll(@AccessContextHttp() clientAccess: AccessContext, @CombinedInput() dto: PocTypings.EventoListOperationInput): Promise<PocTypings.EventoListCombinedSuccessOutput["body"]> {
    return this.eventoService.eventoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.EventoFindOneById)
  async eventoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoFindOneByIdOperationInput,
  ) {
    return this.eventoService.eventoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.EventoCreate)
  async eventoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoCreateOperationInput,
  ) {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.EventoUpdateOneById)
  async eventoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoUpdateByIdOperationInput,
  ) {
    return this.eventoService.eventoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.EventoDeleteOneById)
  async eventoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EventoDeleteByIDCombinedInput,
  ) {
    return this.eventoService.eventoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
