import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { CalendarioLetivoService } from './calendario-letivo.service';

@Resolver()
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.List)
  async calendarioLetivoFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoListCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.FindById)
  async calendarioLetivoFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoFindByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.Create)
  async calendarioLetivoCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoCreateCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.Create)
  async calendarioLetivoUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.CalendarioLetivo.Operations.DeleteById)
  async calendarioLetivoDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CalendarioLetivoDeleteByIDCombinedInput,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
