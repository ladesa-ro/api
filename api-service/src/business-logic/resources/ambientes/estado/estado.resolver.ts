import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation, graphqlExtractSelection } from "@/business-logic/standards";
import * as LadesaTypings from "@ladesa-ro/especificacao";
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
  @Operation(LadesaTypings.Tokens.Estado.Operations.List)
  async estadoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoListCombinedInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.estadoService.findAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  // ========================================================
  @Operation(LadesaTypings.Tokens.Estado.Operations.FindById)
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
