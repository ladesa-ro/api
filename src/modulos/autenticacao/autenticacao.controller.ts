import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../autenticacao';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../helpers/ladesa';
import { AutenticacaoService } from './autenticacao.service';

@ApiTags('Autenticacao')
@Controller('/autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('/quem-sou-eu')
  @Operation(LadesaTypings.Tokens.Auth.Operations.WhoAmI)
  quemSouEu(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
  ) {
    return this.autenticacaoService.quemSouEu(contextoDeAcesso);
  }

  @Post('/login')
  @Public()
  @Operation(LadesaTypings.Tokens.Auth.Operations.Login)
  login(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AuthLoginCombinedInput,
  ) {
    return this.autenticacaoService.login(contextoDeAcesso, dto);
  }

  @Post('/login/refresh')
  @Public()
  @Operation(LadesaTypings.Tokens.Auth.Operations.Refresh)
  refresh(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AuthRefreshCombinedInput,
  ) {
    return this.autenticacaoService.refresh(contextoDeAcesso, dto);
  }

  @Post('/definir-senha')
  @Operation(LadesaTypings.Tokens.Auth.Operations.SetInitialPassword)
  definirSenha(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AuthSetInitialPasswordCombinedInput,
  ) {
    return this.autenticacaoService.definirSenha(contextoDeAcesso, dto);
  }
}
