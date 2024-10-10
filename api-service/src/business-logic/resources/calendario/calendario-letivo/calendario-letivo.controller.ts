import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@ApiTags("Calendarios Letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.List)
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoListCombinedInput,
  ): Promise<LadesaTypings.CalendarioLetivoListCombinedSuccessOutput["body"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.FindById)
  async calendarioLetivoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoFindByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.Create)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoCreateCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.UpdateById)
  async calendarioLetivoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.DeleteById)
  async CalendarioLetivoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoDeleteByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
