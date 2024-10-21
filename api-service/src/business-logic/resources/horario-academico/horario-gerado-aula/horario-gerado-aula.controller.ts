import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@ApiTags("Horarios Gerados Aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  @PocOperation(PocTokens.HorarioGeradoAulaList)
  async horarioGeradoAulaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaListCombinedInput,
  ): Promise<LadesaTypings.HorarioGeradoAulaListCombinedSuccessOutput["body"]> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.HorarioGeradoAulaFindOneByID)
  async horarioGeradoAulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaFindByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.HorarioGeradoAulaCreate)
  async horarioGeradoAulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaCreateCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.HorarioGeradoAulaUpdateOneByID)
  async HorarioGeradoAulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaUpdateByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.HorarioGeradoAulaDeleteOneByID)
  async HorarioGeradoAulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaDeleteByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
