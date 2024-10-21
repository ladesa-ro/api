import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiaCalendarioService } from "./dia-calendario.service";

@ApiTags("Dias Calendario")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  @PocOperation(PocTokens.DiaCalendarioList)
  async diaCalendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListCombinedInput,
  ): Promise<LadesaTypings.DiaCalendarioListCombinedSuccessOutput["body"]> {
    return this.diaCalendarioService.diaCalendarioFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.DiaCalendarioFindOneByID)
  async diaCalendarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.DiaCalendarioCreate)
  async diaCalendarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.DiaCalendarioUpdateOneByID)
  async diaCalendarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.DiaCalendarioDeleteOneByID)
  async diaCalendarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
