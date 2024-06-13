import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { EstadoService } from './estado.service';

@ApiTags('Estados')
@Controller('/base/estados')
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get('/')
  @Operation(LadesaTypings.Tokens.Estado.Operations.List)
  async findAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EstadoListCombinedInput,
  ): Promise<LadesaTypings.EstadoListCombinedSuccessOutput['body']> {
    return this.estadoService.findAll(contextoDeAcesso, dto);
  }

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Estado.Operations.FindById)
  async findById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EstadoFindByIDCombinedInput,
  ) {
    return this.estadoService.findByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }
}
