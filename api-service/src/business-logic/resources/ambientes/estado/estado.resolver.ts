import { CombinedInput, graphqlExtractSelection } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Info, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { EstadoService } from "./estado.service";

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}
  // ========================================================
  @PocOperation(PocTokens.EstadoList)
  async estadoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoListCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================
  @PocOperation(PocTokens.EstadoFindOneByID)
  async estadoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoFindByIDCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findByIdStrict(accessContext, { id: dto.params.id }, graphqlExtractSelection(info));
  }
  // ========================================================
}
