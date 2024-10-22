import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Resolver } from "@nestjs/graphql";
import { HorarioGeradoService } from "./horario-gerado.service";

@Resolver()
export class HorarioGeradoResolver {
  constructor(private horarioGeradoService: HorarioGeradoService) {}
  //
  @PocOperation(PocTokens.HorarioGeradoList)
  async horarioGeradoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoListCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.HorarioGeradoFindOneByID)
  async horarioGeradoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoFindByIDCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @PocOperation(PocTokens.HorarioGeradoCreate)
  async horarioGeradoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoCreateCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.HorarioGeradoUpdateOneByID)
  async horarioGeradoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoUpdateByIDCombinedInput,
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.HorarioGeradoDeleteOneByID)
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
