import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { DisciplinaService } from "./disciplina.service";

@Resolver()
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}
  //
  @PocOperation(PocTokens.DisciplinaList)
  async disciplinaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaListCombinedInput,
  ) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DisciplinaFindOneByID)
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
  @PocOperation(PocTokens.DisciplinaCreate)
  async disciplinaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaCreateCombinedInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.DisciplinaUpdateOneByID)
  async disciplinaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.DisciplinaDeleteOneByID)
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
