import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../contexto-de-acesso';
import { Operacao } from '../../especificacao';
import { DadosEntradaGql } from '../../legacy';
import { AutenticacaoService } from './autenticacao.service';

@Resolver()
export class AutenticacaoResolver {
  constructor(
    //
    private autenticacaoService: AutenticacaoService,
  ) {}

  //

  @Operacao(Spec.AutenticacaoQuemSouEuOperator())
  async authQuemSouEu(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso) {
    return this.autenticacaoService.quemSouEu(contextoDeAcesso);
  }

  //

  @Operacao(Spec.AutenticacaoLoginOperator())
  async autenticacaoLogin(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.AutenticacaoLoginOperator())
    dto: Spec.IAutenticacaoLoginInputDto,
  ) {
    return this.autenticacaoService.login(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.AutenticacaoRefreshOperator())
  async autenticacaoRefresh(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.AutenticacaoRefreshOperator())
    dto: Spec.IAutenticacaoRefreshInputDto,
  ) {
    return this.autenticacaoService.refresh(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.AutenticacaoDefinirSenhaOperator())
  async autenticacaoDefinirSenha(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.AutenticacaoDefinirSenhaOperator())
    dto: Spec.IAutenticacaoDefinirSenhaInputDto,
  ) {
    return this.autenticacaoService.definirSenha(contextoDeAcesso, dto);
  }

  //
}
