import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiaCalendarioService } from './dia-calendario.service';

@ApiTags('Dias Calendario')
@Controller('/dias-calendario')
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get('/')
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.List)
  async diaCalendarioFindAll(
    @ContextoDeAcessoHttp() clientAccess: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioListCombinedInput,
  ): Promise<LadesaTypings.DiaCalendarioListCombinedSuccessOutput['body']> {
    return this.diaCalendarioService.diaCalendarioFindAll(clientAccess, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.FindById)
  async diaCalendarioFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioFindByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.Create)
  async diaCalendarioCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioCreateCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.Create)
  async diaCalendarioUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(contextoDeAcesso, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.DiaCalendario.Operations.DeleteById)
  async diaCalendarioDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DiaCalendarioDeleteByIDCombinedInput,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
