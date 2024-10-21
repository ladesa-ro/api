import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { BlocoService } from "./bloco.service";

@Resolver()
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  @PocOperation(PocTokens.BlocoList)
  async blocoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoListCombinedInput,
  ) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.BlocoFindOneByID)
  async blocoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoFindByIDCombinedInput,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.BlocoCreate)
  async blocoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoCreateCombinedInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.BlocoUpdateOneByID)
  async blocoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoUpdateByIDCombinedInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.BlocoDeleteOneByID)
  async blocoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoDeleteByIDCombinedInput,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
