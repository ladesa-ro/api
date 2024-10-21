import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver as GqlResolver } from "@nestjs/graphql";
import { VinculoService } from "./vinculo.service";

@GqlResolver()
export class VinculoResolver {
  constructor(
    //
    private vinculoService: VinculoService,
  ) {}

  //

  @PocOperation(PocTokens.PerfilList)
  async vinculoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.VinculoListCombinedInput,
  ) {
    return this.vinculoService.vinculoFindAll(accessContext, dto);
  }

  @PocOperation(PocTokens.PerfilUpdateOneByID)
  async vinculoSetVinculos(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.VinculoUpdateCombinedInput,
  ) {
    return this.vinculoService.vinculoSetVinculos(accessContext, dto);
  }
}
