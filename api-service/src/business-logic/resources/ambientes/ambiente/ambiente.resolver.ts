import { CombinedInput, Operation, graphqlExtractSelection } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AmbienteService } from "./ambiente.service";

@GqlResolver()
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.List)
  async ambienteFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteListCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ambienteService.ambienteFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.FindById)
  async ambienteFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.Create)
  async ambienteCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateCombinedInput,
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.UpdateById)
  async ambienteUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  @Operation(LadesaTypings.Tokens.Ambiente.Operations.DeleteById)
  async ambienteDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteDeleteByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
