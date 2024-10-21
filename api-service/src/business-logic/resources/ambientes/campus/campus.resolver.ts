import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CampusService } from "./campus.service";

@Resolver()
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}
  //
  @PocOperation(PocTokens.CampusList)
  async campusFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CampusListOperationInput,
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CampusFindOneById)
  async campusFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CampusFindOneByIdOperationInput,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.CampusCreate)
  async campusCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CampusCreateOperationInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  @PocOperation(PocTokens.CampusUpdateOneById)
  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CampusUpdateOperationInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.CampusDeleteOneById)
  async campusDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CampusDeleteByIDCombinedInput,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
