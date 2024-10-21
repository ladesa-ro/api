import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { DiaCalendarioService } from "./dia-calendario.service";

@Resolver()
export class DiaCalendarioResolver {
  constructor(private diaCalendarioService: DiaCalendarioService) {}
  //
  @PocOperation(PocTokens.DiaCalendarioList)
  async diaCalendarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiaCalendarioFindOneByID)
  async diaCalendarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.DiaCalendarioCreate)
  async diaCalendarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiaCalendarioUpdateOneByID)
  async diaCalendarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiaCalendarioDeleteOneByID)
  async diaCalendarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
