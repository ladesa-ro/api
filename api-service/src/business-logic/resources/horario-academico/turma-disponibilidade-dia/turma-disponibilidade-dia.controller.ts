import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TurmaDisponibilidadeDiaService } from "./turma-disponibilidade-dia.service";

@ApiTags("Turmas Disponibilidade Dia")
@Controller("/turmas-disponibilidade-dia")
export class TurmaDisponibilidadeDiaController {
  constructor(private turmaDisponibilidadeDiaService: TurmaDisponibilidadeDiaService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.List)
  async turmaDisponibilidadeDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaListCombinedInput,
  ): Promise<LadesaTypings.TurmaDisponibilidadeDiaListCombinedSuccessOutput["body"]> {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.FindById)
  async turmaDisponibilidadeDiaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaFindByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.Create)
  async turmaDisponibilidadeDiaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.UpdateById)
  async turmaDisponibilidadeDiaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaUpdateByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidadeDia.Operations.DeleteById)
  async turmaDisponibilidadeDiaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaDeleteByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
