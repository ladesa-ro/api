import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { EtapaService } from "./etapa.service";

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.List)
  async etapaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaListCombinedInput,
  ) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.FindById)
  async etapaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaFindByIDCombinedInput,
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaCreateCombinedInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.UpdateById)
  async etapaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIDCombinedInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.DeleteById)
  async etapaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIDCombinedInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
