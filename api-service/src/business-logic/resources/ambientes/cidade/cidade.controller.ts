import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
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
    @CombinedInput() dto: LadesaTypings.CidadeListCombinedInput,
  ): Promise<LadesaTypings.CidadeListCombinedSuccessOutput["body"]> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  @PocOperation(PocTokens.CidadeFindOneByID)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeFindByIDCombinedInput,
  ): Promise<LadesaTypings.CidadeFindOneResult> {
    return this.cidadeService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}
