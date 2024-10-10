import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { DiaCalendarioService } from "./dia-calendario.service";

@Resolver()
export class DiaCalendarioResolver {
  constructor(private diaCalendarioService: DiaCalendarioService) {}
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.List)
  async diaCalendarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.FindById)
  async diaCalendarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.Create)
  async diaCalendarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.UpdateById)
  async diaCalendarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.DeleteById)
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
