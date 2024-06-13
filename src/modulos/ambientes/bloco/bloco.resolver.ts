import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { BlocoService } from './bloco.service';

@Resolver()
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Bloco.Operations.List)
  async blocoFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.BlocoListCombinedInput,
  ) {
    return this.blocoService.blocoFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Bloco.Operations.FindById)
  async blocoFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.BlocoFindOneInput,
  ) {
    return this.blocoService.blocoFindByIdStrict(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Bloco.Operations.Create)
  async blocoCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.BlocoCreateCombinedInput,
  ) {
    return this.blocoService.blocoCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Bloco.Operations.Create)
  async blocoUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.BlocoUpdateByIDCombinedInput,
  ) {
    return this.blocoService.blocoUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Bloco.Operations.DeleteById)
  async blocoDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.BlocoFindOneInput,
  ) {
    return this.blocoService.blocoDeleteOneById(contextoDeAcesso, dto);
  }
}
