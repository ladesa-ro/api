import { AccessContext, AccessContextGraphQl } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ReservaService } from './reserva.service';

@Resolver()
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Reserva.Operations.List)
  async reservaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaListCombinedInput,
  ) {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Reserva.Operations.FindById)
  async reservaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaFindByIDCombinedInput,
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaCreateCombinedInput,
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIDCombinedInput,
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Reserva.Operations.DeleteById)
  async reservaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ReservaDeleteByIDCombinedInput,
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, { id: dto.params.id });
  }
}
