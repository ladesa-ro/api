import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiaCalendarioService } from "./dia-calendario.service";

@ApiTags("Dias Calendario")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.List)
  async diaCalendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListCombinedInput,
  ): Promise<LadesaTypings.DiaCalendarioListCombinedSuccessOutput["body"]> {
    return this.diaCalendarioService.diaCalendarioFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.FindById)
  async diaCalendarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.Create)
  async diaCalendarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.UpdateById)
  async diaCalendarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.DeleteById)
  async diaCalendarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
