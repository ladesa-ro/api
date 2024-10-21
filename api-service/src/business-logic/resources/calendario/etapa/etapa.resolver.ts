import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.EtapaListOperationInput,
  ) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EtapaFindOneById)
  async etapaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EtapaFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.EtapaCreateOperationInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EtapaUpdateOneById)
  async etapaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EtapaUpdateByIdOperationInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.EtapaDeleteOneById)
  async etapaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.EtapaDeleteByIDCombinedInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
