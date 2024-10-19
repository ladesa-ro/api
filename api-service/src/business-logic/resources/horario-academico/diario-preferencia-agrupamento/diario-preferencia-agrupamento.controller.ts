import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@ApiTags("Diarios Preferencia Agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.List)
  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoListCombinedInput,
  ): Promise<LadesaTypings.DiarioPreferenciaAgrupamentoListCombinedSuccessOutput["body"]> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.FindById)
  async diarioPreferenciaAgrupamentoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoFindByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.Create)
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoCreateCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.UpdateById)
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoUpdateByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.DeleteById)
  async diarioPreferenciaAgrupamentoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoDeleteByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
