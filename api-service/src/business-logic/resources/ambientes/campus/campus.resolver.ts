import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CampusService } from "./campus.service";

@Resolver()
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Campus.Operations.List)
  async campusFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusListCombinedInput,
  ) {
    return this.campusService.campusFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Campus.Operations.FindById)
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
  @Operation(LadesaTypings.Tokens.Campus.Operations.Create)
  async campusCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusCreateCombinedInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  @Operation(LadesaTypings.Tokens.Campus.Operations.UpdateById)
  async campusUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusUpdateByIDCombinedInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Campus.Operations.DeleteById)
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
