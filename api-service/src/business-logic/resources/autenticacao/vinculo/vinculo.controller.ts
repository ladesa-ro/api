import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { VinculoService } from "./vinculo.service";

@Controller("/vinculos")
@ApiTags("Vinculos")
export class VinculoController {
  constructor(private vinculoService: VinculoService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.Vinculo.Operations.List)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.VinculoListCombinedInput,
  ) {
    return this.vinculoService.vinculoFindAll(accessContext, dto);
  }

  @Post("/")
  @Operation(LadesaTypings.Tokens.Vinculo.Operations.Update)
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.VinculoUpdateCombinedInput,
  ) {
    return this.vinculoService.vinculoSetVinculos(accessContext, dto);
  }
}
