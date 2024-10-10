import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@ApiTags("Horarios Gerados Aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.List)
  async horarioGeradoAulaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaListCombinedInput,
  ): Promise<LadesaTypings.HorarioGeradoAulaListCombinedSuccessOutput["body"]> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.FindById)
  async horarioGeradoAulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaFindByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.Create)
  async horarioGeradoAulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaCreateCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.UpdateById)
  async HorarioGeradoAulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaUpdateByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.DeleteById)
  async HorarioGeradoAulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaDeleteByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
