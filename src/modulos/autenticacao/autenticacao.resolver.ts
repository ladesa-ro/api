import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { AutenticacaoOperations } from './autenticacao.dtos';
import { AutenticacaoService } from './autenticacao.service';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../contexto-de-acesso';
import { DtoOperationGqlQuery, DtoOperationGqlMutation, GqlDtoInput } from '../../legacy';

@Resolver()
export class AutenticacaoResolver {
  constructor(
    //
    private autenticacaoService: AutenticacaoService,
  ) {}

  //

  @DtoOperationGqlQuery(AutenticacaoOperations.AUTENTICACAO_QUEM_SOU_EU)
  async authQuemSouEu(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso) {
    return this.autenticacaoService.quemSouEu(contextoDeAcesso);
  }

  //

  @DtoOperationGqlMutation(AutenticacaoOperations.AUTENTICACAO_LOGIN)
  async autenticacaoLogin(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(AutenticacaoOperations.AUTENTICACAO_LOGIN)
    dto: Dto.IAutenticacaoLoginInputDto,
  ) {
    return this.autenticacaoService.login(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(AutenticacaoOperations.AUTENTICACAO_REFRESH)
  async autenticacaoRefresh(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(AutenticacaoOperations.AUTENTICACAO_REFRESH)
    dto: Dto.IAutenticacaoRefreshInputDto,
  ) {
    return this.autenticacaoService.refresh(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA)
  async autenticacaoDefinirSenha(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA)
    dto: Dto.IAutenticacaoDefinirSenhaInputDto,
  ) {
    return this.autenticacaoService.definirSenha(contextoDeAcesso, dto);
  }

  //
}
