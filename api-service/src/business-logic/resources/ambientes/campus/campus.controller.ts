import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CampusService } from "./campus.service";

@ApiTags("Campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.CampusList)
  async campusFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusListCombinedInput,
  ): Promise<LadesaTypings.CampusListCombinedSuccessOutput["body"]> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.CampusFindOneByID)
  async campusFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.CampusCreate)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusCreateCombinedInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.CampusUpdateOneByID)
  async campusUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusUpdateByIDCombinedInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.CampusDeleteOneByID)
  async campusDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
