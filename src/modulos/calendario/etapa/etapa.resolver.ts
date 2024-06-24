import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { EtapaService } from './etapa.service';

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.List)
  async etapaFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaListCombinedInput,
  ) {
    return this.etapaService.etapaFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.FindById)
  async etapaFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaFindByIDCombinedInput,
  ) {
    return this.etapaService.etapaFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaCreateCombinedInput,
  ) {
    return this.etapaService.etapaCreate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIDCombinedInput,
  ) {
    return this.etapaService.etapaUpdate(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Etapa.Operations.DeleteById)
  async etapaDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIDCombinedInput,
  ) {
    return this.etapaService.etapaDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
