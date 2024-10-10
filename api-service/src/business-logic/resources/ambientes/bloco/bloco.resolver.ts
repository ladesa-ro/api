import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { BlocoService } from "./bloco.service";

@Resolver()
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  @Operation(LadesaTypings.Tokens.Bloco.Operations.List)
  async blocoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoListCombinedInput,
  ) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Bloco.Operations.FindById)
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
  @Operation(LadesaTypings.Tokens.Bloco.Operations.Create)
  async blocoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoCreateCombinedInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Bloco.Operations.UpdateById)
  async blocoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.BlocoUpdateByIDCombinedInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Bloco.Operations.DeleteById)
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
