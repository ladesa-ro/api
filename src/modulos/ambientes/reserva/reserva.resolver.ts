import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
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
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaListCombinedInput,
  ) {
    return this.reservaService.reservaFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Reserva.Operations.FindById)
  async reservaFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaFindOneInput,
  ) {
    return this.reservaService.reservaFindByIdStrict(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaCreateCombinedInput,
  ) {
    return this.reservaService.reservaCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Reserva.Operations.Create)
  async reservaUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaUpdateByIDCombinedInput,
  ) {
    return this.reservaService.reservaUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Reserva.Operations.DeleteById)
  async reservaDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.ReservaFindOneInput,
  ) {
    return this.reservaService.reservaDeleteOneById(contextoDeAcesso, dto);
  }
}
