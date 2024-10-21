import { CombinedInput, graphqlExtractSelection } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
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
  @PocOperation(PocTokens.ModalidadeList)
  async modalidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeListCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @PocOperation(PocTokens.ModalidadeFindOneByID)
  async modalidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindByIDCombinedInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }
  //
  @PocOperation(PocTokens.ModalidadeCreate)
  async modalidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateCombinedInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.ModalidadeUpdateOneByID)
  async modalidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.ModalidadeDeleteOneByID)
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
