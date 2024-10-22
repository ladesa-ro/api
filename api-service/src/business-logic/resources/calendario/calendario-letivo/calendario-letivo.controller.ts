import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@ApiTags("Calendarios Letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  @PocOperation(PocTokens.CalendarioLetivoList)
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoListCombinedInput,
  ): Promise<LadesaTypings.CalendarioLetivoListCombinedSuccessOutput["body"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.CalendarioLetivoFindOneByID)
  async calendarioLetivoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoFindByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.CalendarioLetivoCreate)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoCreateCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.CalendarioLetivoUpdateOneByID)
  async calendarioLetivoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.CalendarioLetivoDeleteOneByID)
  async CalendarioLetivoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoDeleteByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
