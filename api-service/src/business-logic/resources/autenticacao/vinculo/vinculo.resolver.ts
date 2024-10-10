import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver as GqlResolver } from "@nestjs/graphql";
import { VinculoService } from "./vinculo.service";

@GqlResolver()
export class VinculoResolver {
  constructor(
    //
    private vinculoService: VinculoService,
  ) {}

  //

  @Operation(LadesaTypings.Tokens.Vinculo.Operations.List)
  async vinculoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.VinculoListCombinedInput,
  ) {
    return this.vinculoService.vinculoFindAll(accessContext, dto);
  }

  @Operation(LadesaTypings.Tokens.Vinculo.Operations.Update)
  async vinculoSetVinculos(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.VinculoUpdateCombinedInput,
  ) {
    return this.vinculoService.vinculoSetVinculos(accessContext, dto);
  }
}
