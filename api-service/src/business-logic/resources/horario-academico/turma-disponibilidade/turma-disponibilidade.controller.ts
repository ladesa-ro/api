import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@ApiTags("Turmas Disponibilidade")
@Controller("/turmas-disponibilidade")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.List)
  async turmaDisponibilidadeFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeListCombinedInput,
  ): Promise<LadesaTypings.TurmaDisponibilidadeListCombinedSuccessOutput["body"]> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.FindById)
  async turmaDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeFindByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.Create)
  async turmaDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.UpdateById)
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeUpdateByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.DeleteById)
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDeleteByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
