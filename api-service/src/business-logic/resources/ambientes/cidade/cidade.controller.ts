import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CidadeService } from "./cidade.service";

@ApiTags("Cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get("/")
  @PocOperation(PocTokens.CidadeList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CidadeListOperationInput,
  ): Promise<PocTypings.CidadeListCombinedSuccessOutput["body"]> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  @PocOperation(PocTokens.CidadeFindOneById)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CidadeFindOneByIdOperationInput,
  ): Promise<PocTypings.CidadeFindOneResult> {
    return this.cidadeService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}
