import { CombinedInput } from "@/business-logic/standards";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TurmaDisponibilidadeDiaService } from "./turma-disponibilidade-dia.service";

@ApiTags("Turmas Disponibilidade Dia")
@Controller("/turmas-disponibilidade-dia")
export class TurmaDisponibilidadeDiaController {
  constructor(private turmaDisponibilidadeDiaService: TurmaDisponibilidadeDiaService) {}

  @Get("/")
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaList)
  async turmaDisponibilidadeDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaListCombinedInput,
  ): Promise<LadesaTypings.TurmaDisponibilidadeDiaListCombinedSuccessOutput["body"]> {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaFindOneByID)
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
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaCreate)
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
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaUpdateOneByID)
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
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaDeleteOneByID)
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
