import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { TurmaService } from "./turma.service";

@Resolver()
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}
  //
  @PocOperation(PocTokens.TurmaList)
  async turmaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaListCombinedInput,
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.TurmaFindOneByID)
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
  @PocOperation(PocTokens.TurmaCreate)
  async turmaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaCreateCombinedInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.TurmaUpdateOneByID)
  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaUpdateByIDCombinedInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.TurmaDeleteOneByID)
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
