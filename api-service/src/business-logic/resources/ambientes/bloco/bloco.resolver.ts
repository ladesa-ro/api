import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.BlocoListOperationInput,
  ) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.BlocoFindOneById)
  async blocoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.BlocoFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.BlocoCreateOperationInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.BlocoUpdateOneById)
  async blocoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.BlocoUpdateByIdOperationInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.BlocoDeleteOneById)
  async blocoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.BlocoDeleteByIDCombinedInput,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
