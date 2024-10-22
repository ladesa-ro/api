import { CombinedInput, graphqlExtractSelection } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CidadeService } from "./cidade.service";

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  // ========================================================

  @PocOperation(PocTokens.CidadeList)
  async cidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeListCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================
  @PocOperation(PocTokens.CidadeFindOneByID)
  async cidadeFindById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeFindByIDCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.cidadeService.findByIdStrict(accessContext, { id: dto.params.id }, graphqlExtractSelection(info));
  }
}
