import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { DiarioPreferenciaAgrupamentoService } from './diario-preferencia-agrupamento.service';

@Resolver()
export class DiarioPreferenciaAgrupamentoResolver {
  constructor(private diarioPreferenciaAgrupamentoService: DiarioPreferenciaAgrupamentoService) {}
  //
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.List)
  async diarioPreferenciaAgrupamentoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioPreferenciaAgrupamentoListCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.FindById)
  async diarioPreferenciaAgrupamentoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioPreferenciaAgrupamentoFindByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.Create)
  async diarioPreferenciaAgrupamentoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioPreferenciaAgrupamentoCreateCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.UpdateById)
  async diarioPreferenciaAgrupamentoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioPreferenciaAgrupamentoUpdateByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiarioPreferenciaAgrupamento.Operations.DeleteById)
  async diarioPreferenciaAgrupamentoOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioPreferenciaAgrupamentoDeleteByIDCombinedInput,
  ) {
    return this.diarioPreferenciaAgrupamentoService.diarioPreferenciaAgrupamentoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
