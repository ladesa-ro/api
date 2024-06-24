import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiarioService } from './diario.service';

@ApiTags('Diarios')
@Controller('/diarios')
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Diario.Operations.List)
  async diarioFindAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioListCombinedInput,
  ): Promise<LadesaTypings.DiarioListCombinedSuccessOutput['body']> {
    return this.diarioService.diarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Diario.Operations.FindById)
  async diarioFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioFindByIDCombinedInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioCreateCombinedInput,
  ) {
    return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIDCombinedInput,
  ) {
    return this.diarioService.diarioUpdate(contextoDeAcesso, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Diario.Operations.DeleteById)
  async diarioDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
