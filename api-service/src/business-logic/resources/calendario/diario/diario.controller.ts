import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioService } from "./diario.service";

@ApiTags("Diarios")
@Controller("/diarios")
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.DiarioList)
  async diarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioListCombinedInput,
  ): Promise<LadesaTypings.DiarioListCombinedSuccessOutput["body"]> {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.DiarioFindOneByID)
  async diarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioFindByIDCombinedInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.DiarioCreate)
  async diarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioCreateCombinedInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.DiarioUpdateOneByID)
  async diarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIDCombinedInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.DiarioDeleteOneByID)
  async diarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
