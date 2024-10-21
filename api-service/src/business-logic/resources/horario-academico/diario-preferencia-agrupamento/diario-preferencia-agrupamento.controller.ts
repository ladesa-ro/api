import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@ApiTags("Diarios Preferencia Agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DiarioPreferenciaAgrupamentoController {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}

  @Get("/")
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoList)
  async diarioPreferenciaAgrupamentoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoListCombinedInput,
  ): Promise<LadesaTypings.DiarioPreferenciaAgrupamentoListCombinedSuccessOutput["body"]> {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoFindOneByID)
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
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoCreate)
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
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoUpdateOneByID)
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
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoDeleteOneByID)
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
