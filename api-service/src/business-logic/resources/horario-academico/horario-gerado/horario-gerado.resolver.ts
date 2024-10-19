import { CombinedInput, Operation } from "@/business-logic/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { HorarioGeradoService } from "./horario-gerado.service";

@Resolver()
export class HorarioGeradoResolver {
  constructor(private horarioGeradoService: HorarioGeradoService) {}
  //
  @Operation(LadesaTypings.Tokens.HorarioGerado.Operations.List)
  async horarioGeradoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoListCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGerado.Operations.FindById)
  async horarioGeradoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoFindByIDCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGerado.Operations.Create)
  async horarioGeradoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoCreateCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGerado.Operations.UpdateById)
  async horarioGeradoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoUpdateByIDCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGerado.Operations.DeleteById)
  async horarioGeradoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoDeleteByIDCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
