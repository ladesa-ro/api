import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AulaService } from "./aula.service";

@ApiTags("Aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.AulaList)
  async aulaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaListCombinedInput,
  ): Promise<LadesaTypings.AulaListCombinedSuccessOutput["body"]> {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.AulaFindOneByID)
  async aulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaFindByIDCombinedInput,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.AulaCreate)
  async aulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaCreateCombinedInput,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.AulaUpdateOneByID)
  async aulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaUpdateByIDCombinedInput,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.AulaDeleteOneByID)
  async aulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaDeleteByIDCombinedInput,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
