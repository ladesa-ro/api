import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DisciplinaService } from "./disciplina.service";

@Resolver()
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.List)
  async disciplinaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaListCombinedInput,
  ) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.FindById)
  async disciplinaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaFindByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.Create)
  async disciplinaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaCreateCombinedInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.UpdateById)
  async disciplinaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.DeleteById)
  async disciplinaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaDeleteByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
