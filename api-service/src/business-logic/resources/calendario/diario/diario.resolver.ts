import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { DiarioService } from "./diario.service";

@Resolver()
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}
  //
  @PocOperation(PocTokens.DiarioList)
  async diarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioListCombinedInput,
  ) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiarioFindOneByID)
  async diarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioFindByIDCombinedInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.DiarioCreate)
  async diarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioCreateCombinedInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioUpdateOneByID)
  async diarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIDCombinedInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.DiarioDeleteOneByID)
  async diarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
