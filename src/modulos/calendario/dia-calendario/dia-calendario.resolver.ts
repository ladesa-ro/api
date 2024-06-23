import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiaCalendarioService } from './dia-calendario.service';

@Resolver()
export class DiaCalendarioResolver {
  constructor(private diaCalendarioService: DiaCalendarioService) {}
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.List)
  async diaCalendarioFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.FindById)
  async diaCalendarioFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.Create)
  async diaCalendarioCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.Create)
  async diaCalendarioUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.DeleteById)
  async diaCalendarioDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
