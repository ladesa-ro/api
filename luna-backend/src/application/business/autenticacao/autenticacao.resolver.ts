import { Resolver } from '@nestjs/graphql';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery, GqlDtoInput } from 'infrastructure';
import * as Dto from '../(spec)';
import { IClientAccess } from '../../../domain';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoOperations } from './dtos';

@Resolver()
export class AutenticacaoResolver {
  constructor(
    //
    private autenticacaoService: AutenticacaoService,
  ) {}

  //

  @DtoOperationGqlQuery(AutenticacaoOperations.AUTENTICACAO_QUEM_SOU_EU)
  async usuarioFindOneById(@ClientAccessGraphQl() clientAccess: IClientAccess) {
    return this.autenticacaoService.quemSouEu(clientAccess);
  }

  //

  @DtoOperationGqlMutation(AutenticacaoOperations.AUTENTICACAO_LOGIN)
  async autenticacaoLogin(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(AutenticacaoOperations.AUTENTICACAO_LOGIN)
    dto: Dto.IAutenticacaoLoginInputDto,
  ) {
    return this.autenticacaoService.login(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(AutenticacaoOperations.AUTENTICACAO_REFRESH)
  async autenticacaoRefresh(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(AutenticacaoOperations.AUTENTICACAO_REFRESH)
    dto: Dto.IAutenticacaoRefreshInputDto,
  ) {
    return this.autenticacaoService.refresh(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA)
  async autenticacaoDefinirSenha(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA)
    dto: Dto.IAutenticacaoDefinirSenhaInputDto,
  ) {
    return this.autenticacaoService.definirSenha(clientAccess, dto);
  }

  //
}
