import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.AulaListOperationInput,
  ) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.AulaFindOneById)
  async aulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.AulaFindOneByIdOperationInput,
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
    @CombinedInput() dto: PocTypings.AulaCreateOperationInput,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.AulaUpdateOneById)
  async aulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.AulaUpdateByIdOperationInput,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.AulaDeleteOneById)
  async aulaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.AulaDeleteByIDCombinedInput,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
