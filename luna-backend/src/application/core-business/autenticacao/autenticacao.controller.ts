import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IClientAccess } from '../../../domain';
import { ClientAccessHttp } from '../../../infrastructure';
import { AutenticacaoService } from './autenticacao.service';

@ApiTags('Autenticação')
@Controller('/autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get('/quem-sou-eu')
  @ApiBearerAuth()
  quemSouEu(@ClientAccessHttp() clientAccess: IClientAccess) {
    return this.autenticacaoService.quemSouEu(clientAccess);
  }
}
