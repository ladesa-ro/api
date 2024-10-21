import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioProfessorService } from "./diario-professor.service";

@ApiTags("DiarioProfessor")
@Controller("/diario-professor")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.DiarioProfessorList)
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListCombinedInput,
  ): Promise<LadesaTypings.DiarioProfessorListCombinedSuccessOutput["body"]> {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.DiarioProfessorFindOneByID)
  async diarioProfessorFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorFindByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.DiarioProfessorCreate)
  async diarioProfessorCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.DiarioProfessorUpdateOneByID)
  async diarioProfessorUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.DiarioProfessorDeleteOneByID)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIDCombinedInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
