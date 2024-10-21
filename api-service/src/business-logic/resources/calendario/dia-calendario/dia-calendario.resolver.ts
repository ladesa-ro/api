import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
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
    @CombinedInput() dto: PocTypings.DiaCalendarioListOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiaCalendarioFindOneById)
  async diaCalendarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiaCalendarioFindOneByIdOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.DiaCalendarioCreate)
  async diaCalendarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiaCalendarioCreateOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiaCalendarioUpdateOneById)
  async diaCalendarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiaCalendarioUpdateByIdOperationInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiaCalendarioDeleteOneById)
  async diaCalendarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.DiaCalendarioDeleteByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
