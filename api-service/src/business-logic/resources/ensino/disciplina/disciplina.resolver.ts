import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.DisciplinaListOperationInput,
  ) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DisciplinaFindOneById)
  async disciplinaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DisciplinaFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.DisciplinaCreateOperationInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.DisciplinaUpdateOneById)
  async disciplinaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DisciplinaUpdateByIdOperationInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.DisciplinaDeleteOneById)
  async disciplinaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DisciplinaDeleteByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
