import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../access-context';
import { Public } from '../../authentication';
import { AutenticacaoService } from './autenticacao.service';
import { Operation, CombinedInput } from '../../fixtures';

@ApiTags('Autenticacao')
@Controller('/autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('/quem-sou-eu')
  @Operation(LadesaTypings.Tokens.Auth.Operations.WhoAmI)
  quemSouEu(
    //
    @AccessContextHttp() accessContext: AccessContext,
  ) {
    return this.autenticacaoService.quemSouEu(accessContext);
  }

  @Post('/login')
  @Public()
  @Operation(LadesaTypings.Tokens.Auth.Operations.Login)
  login(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthLoginCombinedInput,
  ) {
    return this.autenticacaoService.login(accessContext, dto);
  }

  @Post('/login/refresh')
  @Public()
  @Operation(LadesaTypings.Tokens.Auth.Operations.Refresh)
  refresh(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthRefreshCombinedInput,
  ) {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post('/definir-senha')
  @Operation(LadesaTypings.Tokens.Auth.Operations.SetInitialPassword)
  definirSenha(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthSetInitialPasswordCombinedInput,
  ) {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }
}
