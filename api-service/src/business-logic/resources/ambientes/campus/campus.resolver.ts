import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
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
    @CombinedInput() dto: LadesaTypings.CampusListCombinedInput,
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CampusFindOneByID)
  async campusFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusFindByIDCombinedInput,
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
    @CombinedInput() dto: LadesaTypings.CampusCreateCombinedInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  @PocOperation(PocTokens.CampusUpdateOneByID)
  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusUpdateByIDCombinedInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.CampusDeleteOneByID)
  async campusDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusDeleteByIDCombinedInput,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
