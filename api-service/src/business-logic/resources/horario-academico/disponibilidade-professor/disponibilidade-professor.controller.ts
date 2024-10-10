import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeProfessorService } from "./disponibilidade-professor.service";

@ApiTags("Disponibilidades Professor")
@Controller("/disponibilidades-professor")
export class DisponibilidadeProfessorController {
  constructor(private disponibilidadeProfessorService: DisponibilidadeProfessorService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.List)
  async disponibilidadeProfessorFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorListCombinedInput,
  ): Promise<LadesaTypings.DisponibilidadeProfessorListCombinedSuccessOutput["body"]> {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.FindById)
  async disponibilidadeProfessorFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorFindByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.Create)
  async disponibilidadeProfessorCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorCreateCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.UpdateById)
  async disponibilidadeProfessorUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorUpdateByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessor.Operations.DeleteById)
  async disponibilidadeProfessorDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDeleteByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
