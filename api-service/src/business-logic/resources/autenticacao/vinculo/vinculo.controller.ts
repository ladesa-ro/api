import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { VinculoService } from "./vinculo.service";

@Controller("/vinculos")
@ApiTags("Vinculos")
export class VinculoController {
  constructor(private vinculoService: VinculoService) {}

  @Get("/")
  @PocOperation(PocTokens.PerfilList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.PerfilListOperationInput,
  ) {
    return this.vinculoService.vinculoFindAll(accessContext, dto);
  }

  @Post("/")
  @PocOperation(PocTokens.PerfilUpdateOneById)
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.VinculoUpdateCombinedInput,
  ) {
    return this.vinculoService.vinculoSetVinculos(accessContext, dto);
  }
}
