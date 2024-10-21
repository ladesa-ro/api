import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@ApiTags("Turmas Disponibilidade")
@Controller("/turmas-disponibilidade")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Get("/")
  @PocOperation(PocTokens.TurmaDisponibilidadeList)
  async turmaDisponibilidadeFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeListCombinedInput,
  ): Promise<LadesaTypings.TurmaDisponibilidadeListCombinedSuccessOutput["body"]> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.TurmaDisponibilidadeFindOneByID)
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
  @PocOperation(PocTokens.TurmaDisponibilidadeCreate)
  async turmaDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.TurmaDisponibilidadeUpdateOneByID)
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
  @PocOperation(PocTokens.TurmaDisponibilidadeDeleteOneByID)
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
