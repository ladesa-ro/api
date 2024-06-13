import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { VinculoService } from './vinculo.service';

@Controller('/vinculos')
@ApiTags('Vinculos')
export class VinculoController {
  constructor(private vinculoService: VinculoService) {}

  @Get('/')
  @Operation(LadesaTypings.Tokens.Vinculo.Operations.List)
  async findAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.VinculoListCombinedInput,
  ) {
    return this.vinculoService.vinculoFindAll(contextoDeAcesso, dto);
  }

  @Post('/')
  @Operation(LadesaTypings.Tokens.Vinculo.Operations.Update)
  async vinculoSetVinculos(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.VinculoUpdateCombinedInput,
  ) {
    return this.vinculoService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
