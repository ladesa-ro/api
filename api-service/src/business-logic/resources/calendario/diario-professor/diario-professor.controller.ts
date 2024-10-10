import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioProfessorService } from "./diario-professor.service";

@ApiTags("DiarioProfessor")
@Controller("/diario-professor")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get("/")
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.List)
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListCombinedInput,
  ): Promise<LadesaTypings.DiarioProfessorListCombinedSuccessOutput["body"]> {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.FindById)
  async diarioProfessorFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorFindByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.Create)
  async diarioProfessorCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.UpdateById)
  async diarioProfessorUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.DiarioProfessor.Operations.DeleteById)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
