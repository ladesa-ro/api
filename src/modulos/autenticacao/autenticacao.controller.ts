import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import type { IContextoDeAcesso } from '../../../domain';
import { ContextoDeAcessoHttp, DtoOperationCreate, DtoOperationFindOne, HttpDtoBody } from '../../../infraestrutura';
import { Public } from '../../../infraestrutura/authentication';
import { AutenticacaoOperations } from './autenticacao.dtos';
import { AutenticacaoService } from './autenticacao.service';

@ApiTags('Autenticacao')
@Controller('/autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('/quem-sou-eu')
  @DtoOperationFindOne(AutenticacaoOperations.AUTENTICACAO_QUEM_SOU_EU)
  quemSouEu(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso) {
    return this.autenticacaoService.quemSouEu(contextoDeAcesso);
  }

  @Post('/login')
  @Public()
  @DtoOperationCreate(AutenticacaoOperations.AUTENTICACAO_LOGIN)
  login(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(AutenticacaoOperations.AUTENTICACAO_LOGIN) dto: Dto.IAutenticacaoLoginInputDto) {
    return this.autenticacaoService.login(contextoDeAcesso, dto);
  }

  @Post('/login/refresh')
  @Public()
  @DtoOperationCreate(AutenticacaoOperations.AUTENTICACAO_REFRESH)
  refresh(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(AutenticacaoOperations.AUTENTICACAO_REFRESH) dto: Dto.IAutenticacaoRefreshInputDto) {
    return this.autenticacaoService.refresh(contextoDeAcesso, dto);
  }

  @Post('/definir-senha')
  @DtoOperationCreate(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA)
  definirSenha(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA) dto: Dto.IAutenticacaoDefinirSenhaInputDto) {
    return this.autenticacaoService.definirSenha(contextoDeAcesso, dto);
  }
}
