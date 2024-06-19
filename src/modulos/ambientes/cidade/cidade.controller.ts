import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { CidadeService } from './cidade.service';

@ApiTags('Cidades')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get('/')
  @Operation(LadesaTypings.Tokens.Cidade.Operations.List)
  async findAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CidadeListCombinedInput,
  ): Promise<LadesaTypings.CidadeListCombinedSuccessOutput['body']> {
    return this.cidadeService.findAll(contextoDeAcesso, dto);
  }

  // ========================================================

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Cidade.Operations.FindById)
  async findById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CidadeFindByIDCombinedInput,
  ): Promise<LadesaTypings.CidadeFindOneResult> {
    return this.cidadeService.findByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
}
