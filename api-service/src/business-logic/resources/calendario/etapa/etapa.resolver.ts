import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { EtapaService } from "./etapa.service";

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}
  //
  @PocOperation(PocTokens.EtapaList)
  async etapaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaListCombinedInput,
  ) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EtapaFindOneByID)
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
  @PocOperation(PocTokens.EtapaCreate)
  async etapaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaCreateCombinedInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EtapaUpdateOneByID)
  async etapaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIDCombinedInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EtapaDeleteOneByID)
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
