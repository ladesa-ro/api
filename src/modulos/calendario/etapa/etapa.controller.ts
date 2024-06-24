import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { EtapaService } from './etapa.service';

@ApiTags('Etapas')
@Controller('/etapas')
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get('/')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.List)
  async etapaFindAll(
    @ContextoDeAcessoHttp() clientAccess: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaListCombinedInput,
  ): Promise<LadesaTypings.EtapaListCombinedSuccessOutput['body']> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.FindById)
  async etapaFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaFindByIDCombinedInput,
  ) {
    return this.etapaService.etapaFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaCreateCombinedInput,
  ) {
    return this.etapaService.etapaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIDCombinedInput,
  ) {
    return this.etapaService.etapaUpdate(contextoDeAcesso, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.DeleteById)
  async etapaDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIDCombinedInput,
  ) {
    return this.etapaService.etapaDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
