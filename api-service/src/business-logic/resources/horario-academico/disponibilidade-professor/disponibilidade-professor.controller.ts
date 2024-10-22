import { CombinedInput } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeProfessorService } from "./disponibilidade-professor.service";

@ApiTags("Disponibilidades Professor")
@Controller("/disponibilidades-professor")
export class DisponibilidadeProfessorController {
  constructor(private disponibilidadeProfessorService: DisponibilidadeProfessorService) {}

  @Get("/")
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorList)
  async disponibilidadeProfessorFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeProfessorListCombinedInput,
  ): Promise<LadesaTypings.DisponibilidadeProfessorListCombinedSuccessOutput["body"]> {
    return this.disponibilidadeProfessorService.disponibilidadeProfessorFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorFindOneByID)
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
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorCreate)
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
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorUpdateOneByID)
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
  // @PocOperacaoApi(PocTokens.DisponibilidadeProfessorDeleteOneByID)
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
