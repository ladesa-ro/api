import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeProfessorDiaService } from "./disponibilidade-professor-dia.service";

@ApiTags("Disponibilidades Professor Dia")
@Controller("/disponibilidades-professor-dia")
export class DisponibilidadeProfessorDiaController {
  constructor(private disponibilidadeProfessorDiaService: DisponibilidadeProfessorDiaService) {}

  @Get("/")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.List)
  async disponibilidadeProfessorDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaListCombinedInput,
  ): Promise<LadesaTypings.DisponibilidadeProfessorDiaListCombinedSuccessOutput["body"]> {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.FindById)
  async disponibilidadeProfessorDiaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaFindByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.Create)
  async disponibilidadeProfessorDiaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaCreateCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.UpdateById)
  async disponibilidadeProfessorDiaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaUpdateByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.DisponibilidadeProfessorDia.Operations.DeleteById)
  async disponibilidadeProfessorDiaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaDeleteByIDCombinedInput,
  ) {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
