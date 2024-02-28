import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '../(dtos)';
import { IClientAccess } from '../../../domain';
import { ClientAccessHttp, DtoOperationCreate, DtoOperationFindOne, HttpDtoBody } from '../../../infrastructure';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoOperations } from './dtos';

@ApiTags('02 Autenticação')
@Controller('/autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('/quem-sou-eu')
  @DtoOperationFindOne(AutenticacaoOperations.AUTENTICACAO_QUEM_SOU_EU)
  quemSouEu(@ClientAccessHttp() clientAccess: IClientAccess) {
    return this.autenticacaoService.quemSouEu(clientAccess);
  }

  @Post('/login')
  @DtoOperationCreate(AutenticacaoOperations.AUTENTICACAO_LOGIN)
  login(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(AutenticacaoOperations.AUTENTICACAO_LOGIN) dto: Dto.IAutenticacaoLoginInputDto) {
    return this.autenticacaoService.login(clientAccess, dto);
  }

  @Post('/definir-senha')
  @DtoOperationCreate(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA)
  definirSenha(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(AutenticacaoOperations.AUTENTICACAO_DEFINIR_SENHA) dto: Dto.IAutenticacaoDefinirSenhaInputDto) {
    return this.autenticacaoService.definirSenha(clientAccess, dto);
  }
}
