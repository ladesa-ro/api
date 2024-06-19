import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver as GqlResolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { VinculoService } from './vinculo.service';

@GqlResolver()
export class VinculoResolver {
  constructor(
    //
    private vinculoService: VinculoService,
  ) {}

  //

  @Operation(LadesaTypings.Tokens.Vinculo.Operations.List)
  async vinculoFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.VinculoListCombinedInput,
  ) {
    return this.vinculoService.vinculoFindAll(contextoDeAcesso, dto);
  }

  @Operation(LadesaTypings.Tokens.Vinculo.Operations.Update)
  async vinculoSetVinculos(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.VinculoUpdateCombinedInput,
  ) {
    return this.vinculoService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
