import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@Resolver()
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.List)
  async calendarioLetivoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoListCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.FindById)
  async calendarioLetivoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoFindByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.Create)
  async calendarioLetivoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoCreateCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.UpdateById)
  async calendarioLetivoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.DeleteById)
  async calendarioLetivoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoDeleteByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.params.id });
  }
}
