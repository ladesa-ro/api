import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { HorarioGeradoAulaService } from './horario-gerado-aula.service';

@Resolver()
export class HorarioGeradoAulaResolver {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}
  //
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.List)
  async horarioGeradoAulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaListCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.FindById)
  async horarioGeradoAulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaFindByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.Create)
  async horarioGeradoAulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaCreateCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.UpdateById)
  async horarioGeradoAulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaUpdateByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.HorarioGeradoAula.Operations.DeleteById)
  async horarioGeradoAulaOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.HorarioGeradoAulaDeleteByIDCombinedInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
