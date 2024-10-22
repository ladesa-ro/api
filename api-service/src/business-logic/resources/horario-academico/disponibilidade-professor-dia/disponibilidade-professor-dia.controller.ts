import { CombinedInput } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeProfessorDiaService } from "./disponibilidade-professor-dia.service";

@ApiTags("Disponibilidades Professor Dia")
@Controller("/disponibilidades-professor-dia")
export class DisponibilidadeProfessorDiaController {
  constructor(private disponibilidadeProfessorDiaService: DisponibilidadeProfessorDiaService) {}

  @Get("/")
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaList)
  async disponibilidadeProfessorDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorDiaListCombinedInput,
  ): Promise<LadesaTypings.DisponibilidadeProfessorDiaListCombinedSuccessOutput["body"]> {
    return this.disponibilidadeProfessorDiaService.disponibilidadeProfessorDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaFindOneByID)
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
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaCreate)
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
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaUpdateOneByID)
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
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDiaDeleteOneByID)
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
