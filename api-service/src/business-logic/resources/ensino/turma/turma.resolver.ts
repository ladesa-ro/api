import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { TurmaService } from "./turma.service";

@Resolver()
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Turma.Operations.List)
  async turmaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaListCombinedInput,
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Turma.Operations.FindById)
  async turmaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindByIDCombinedInput,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(LadesaTypings.Tokens.Turma.Operations.Create)
  async turmaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaCreateCombinedInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Turma.Operations.UpdateById)
  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaUpdateByIDCombinedInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Turma.Operations.DeleteById)
  async turmaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindByIDCombinedInput,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
