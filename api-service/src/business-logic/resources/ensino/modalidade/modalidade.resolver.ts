import { CombinedInput, graphqlExtractSelection } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.ModalidadeListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @PocOperation(PocTokens.ModalidadeFindOneById)
  async modalidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ModalidadeFindOneByIdOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.params.id }, ["id", ...graphqlExtractSelection(info)]);
  }
  //
  @PocOperation(PocTokens.ModalidadeCreate)
  async modalidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ModalidadeCreateOperationInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.ModalidadeUpdateOneById)
  async modalidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ModalidadeUpdateByIdOperationInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.ModalidadeDeleteOneById)
  async modalidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.ModalidadeDeleteByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
