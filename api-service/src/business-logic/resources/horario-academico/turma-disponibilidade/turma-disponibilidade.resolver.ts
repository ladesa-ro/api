import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@Resolver()
export class TurmaDisponibilidadeResolver {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.List)
  async turmaDisponibilidadeFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeListCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.FindById)
  async turmaDisponibilidadeFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeFindByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.Create)
  async turmaDisponibilidadeCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDisponibilidadeCreateCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.UpdateById)
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeUpdateByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.TurmaDisponibilidade.Operations.DeleteById)
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.TurmaDisponibilidadeDeleteByIDCombinedInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, { id: dto.params.id });
  }
}
