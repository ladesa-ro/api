import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { CursoService } from "./curso.service";

@Resolver()
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}
  //
  @PocOperation(PocTokens.CursoList)
  async cursoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoListCombinedInput,
  ) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CursoFindOneByID)
  async cursoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.CursoCreate)
  async cursoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoCreateCombinedInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.CursoUpdateOneByID)
  async cursoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoUpdateByIDCombinedInput,
  ) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.CursoDeleteOneByID)
  async cursoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoDeleteByIDCombinedInput,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
