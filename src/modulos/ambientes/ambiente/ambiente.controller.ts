import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Tokens } from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { AmbienteService } from './ambiente.service';

@ApiTags('Ambientes')
@Controller('/ambientes')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get('/')
  @Operation(Tokens.Ambiente.Operations.List)
  async ambienteFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.AmbienteListCombinedInput,
  ): Promise<LadesaTypings.AmbienteListCombinedSuccessOutput['body']> {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, combinedInput);
  }

  //

  @Get('/:id')
  @Operation(Tokens.Ambiente.Operations.FindById)
  async ambienteFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id: combinedInput.params.id });
  }

  @Post('/')
  @Operation(Tokens.Ambiente.Operations.Create)
  async ambienteCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateCombinedInput,
  ) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(Tokens.Ambiente.Operations.UpdateById)
  async ambienteUpdate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIDCombinedInput) {
    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dto);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.GetCoverImage)
  async ambienteGetImagemCapa(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.ambienteService.ambienteGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Ambiente.Operations.SetCoverImage)
  async ambienteImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(Tokens.Ambiente.Operations.DeleteById)
  async ambienteDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.AmbienteDeleteByIDCombinedInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, { id: combinedInput.params.id });
  }

  //
}
