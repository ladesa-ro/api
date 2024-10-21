import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.TurmaListOperationInput,
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.TurmaFindOneById)
  async turmaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.TurmaFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.TurmaCreateOperationInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.TurmaUpdateOneById)
  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.TurmaUpdateByIdOperationInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.TurmaDeleteOneById)
  async turmaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.TurmaFindOneByIdOperationInput,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
