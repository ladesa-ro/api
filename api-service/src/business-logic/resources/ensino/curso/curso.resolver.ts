import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.CursoListOperationInput,
  ) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.CursoFindOneById)
  async cursoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CursoFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.CursoCreateOperationInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.CursoUpdateOneById)
  async cursoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CursoUpdateByIdOperationInput,
  ) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.CursoDeleteOneById)
  async cursoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.CursoDeleteByIDCombinedInput,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
