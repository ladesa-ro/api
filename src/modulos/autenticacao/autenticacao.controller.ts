import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Public } from '../../autenticacao';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../contexto-de-acesso';
import { Operacao } from '../../especificacao';
import { HttpDtoBody } from '../../legacy';
import { AutenticacaoService } from './autenticacao.service';

@ApiTags('Autenticacao')
@Controller('/autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('/quem-sou-eu')
  @Operacao(Spec.AutenticacaoQuemSouEuOperator())
  quemSouEu(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso) {
    return this.autenticacaoService.quemSouEu(contextoDeAcesso);
  }

  @Post('/login')
  @Public()
  @Operacao(Spec.AutenticacaoLoginOperator())
  login(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.AutenticacaoLoginOperator()) dto: Spec.IAutenticacaoLoginInputDto) {
    return this.autenticacaoService.login(contextoDeAcesso, dto);
  }

  @Post('/login/refresh')
  @Public()
  @Operacao(Spec.AutenticacaoRefreshOperator())
  refresh(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.AutenticacaoRefreshOperator()) dto: Spec.IAutenticacaoRefreshInputDto) {
    return this.autenticacaoService.refresh(contextoDeAcesso, dto);
  }

  @Post('/definir-senha')
  @Operacao(Spec.AutenticacaoDefinirSenhaOperator())
  definirSenha(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.AutenticacaoDefinirSenhaOperator()) dto: Spec.IAutenticacaoDefinirSenhaInputDto) {
    return this.autenticacaoService.definirSenha(contextoDeAcesso, dto);
  }
}
