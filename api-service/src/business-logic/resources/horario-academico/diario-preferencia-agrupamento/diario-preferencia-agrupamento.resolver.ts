import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { DiarioPreferenciaAgrupamentoService } from "./diario-preferencia-agrupamento.service";

@Resolver()
export class DiarioPreferenciaAgrupamentoResolver {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}
  //
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoList)
  async diarioPreferenciaAgrupamentoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoListCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoFindOneByID)
  async diarioPreferenciaAgrupamentoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoFindByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoCreate)
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoCreateCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoUpdateOneByID)
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoUpdateByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.DiarioPreferenciaAgrupamentoDeleteOneByID)
  async diarioPreferenciaAgrupamentoOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioPreferenciaAgrupamentoDeleteByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
