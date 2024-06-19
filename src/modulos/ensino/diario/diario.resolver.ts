import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiarioService } from './diario.service';

@Resolver()
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Diario.Operations.List)
  async diarioFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioListCombinedInput,
  ) {
    return this.diarioService.diarioFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Diario.Operations.FindById)
  async diarioFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioFindByIDCombinedInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioCreateCombinedInput,
  ) {
    return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIDCombinedInput,
  ) {
    return this.diarioService.diarioUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Diario.Operations.DeleteById)
  async diarioDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
