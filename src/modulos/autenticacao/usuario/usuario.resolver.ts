import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { UsuarioService } from './usuario.service';

@Resolver()
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Usuario.Operations.List)
  async usuarioFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioListCombinedInput,
  ) {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Usuario.Operations.FindById)
  async usuarioFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
  //
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateCombinedInput,
  ) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Usuario.Operations.DeleteById)
  async usuarioDeleteOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }
}
