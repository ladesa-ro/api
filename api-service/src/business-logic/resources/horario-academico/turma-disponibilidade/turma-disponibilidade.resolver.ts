import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@Resolver()
export class TurmaDisponibilidadeResolver {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}
  //
  @PocOperation(PocTokens.TurmaDisponibilidadeList)
  async turmaDisponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeListCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.TurmaDisponibilidadeFindOneByID)
  async turmaDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeFindByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.TurmaDisponibilidadeCreate)
  async turmaDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.TurmaDisponibilidadeUpdateOneByID)
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeUpdateByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.TurmaDisponibilidadeDeleteOneByID)
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDeleteByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, { id: dto.params.id });
  }
}
