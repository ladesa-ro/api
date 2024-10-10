import { CombinedInput, Operation, graphqlExtractSelection } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ModalidadeService } from "./modalidade.service";

@GqlResolver()
export class ModalidadeResolver {
  constructor(
    //
    private modalidadeService: ModalidadeService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.List)
  async modalidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeListCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.FindById)
  async modalidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindByIDCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }
  //
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.Create)
  async modalidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateCombinedInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.UpdateById)
  async modalidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.DeleteById)
  async modalidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeDeleteByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
