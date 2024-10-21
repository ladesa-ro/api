import { CombinedInput } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { TurmaDisponibilidadeDiaService } from "./turma-disponibilidade-dia.service";

@Resolver()
export class TurmaDisponibilidadeDiaResolver {
  constructor(private turmaDisponibilidadeDiaService: TurmaDisponibilidadeDiaService) {}
  //
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaList)
  async turmaDisponibilidadeDiaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeDiaListCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindAll(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaFindOneByID)
  async turmaDisponibilidadeDiaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaFindByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaCreate)
  async turmaDisponibilidadeDiaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaCreate(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaUpdateOneByID)
  async turmaDisponibilidadeDiaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaUpdateByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaUpdate(accessContext, dto);
  }
  //
  // @PocOperacaoApi(PocTokens.TurmaDisponibilidadeDiaDeleteOneByID)
  async turmaDisponibilidadeDiaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDiaDeleteByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeDiaService.turmaDisponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
