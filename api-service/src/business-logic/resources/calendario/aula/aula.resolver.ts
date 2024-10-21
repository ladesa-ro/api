import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { AulaService } from "./aula.service";

@Resolver()
export class AulaResolver {
  constructor(
    //
    private aulaService: AulaService,
  ) {}
  //
  @PocOperation(PocTokens.AulaList)
  async aulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaListCombinedInput,
  ) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.AulaFindOneByID)
  async aulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaFindByIDCombinedInput,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.AulaCreate)
  async aulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaCreateCombinedInput,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.AulaUpdateOneByID)
  async aulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaUpdateByIDCombinedInput,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.AulaDeleteOneByID)
  async aulaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaDeleteByIDCombinedInput,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
