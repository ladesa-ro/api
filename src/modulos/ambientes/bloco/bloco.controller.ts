import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { BlocoService } from './bloco.service';

@ApiTags('Blocos')
@Controller('/blocos')
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.List)
  async blocoFindAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.BlocoListCombinedInput,
  ): Promise<LadesaTypings.BlocoListCombinedSuccessOutput['body']> {
    return this.blocoService.blocoFindAll(contextoDeAcesso, combinedInput);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.FindById)
  async blocoFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.Create)
  async blocoCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.BlocoCreateCombinedInput,
  ) {
    return this.blocoService.blocoCreate(contextoDeAcesso, combinedInput);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.UpdateById)
  async blocoUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.BlocoUpdateByIDCombinedInput,
  ) {
    return this.blocoService.blocoUpdate(contextoDeAcesso, combinedInput);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.GetCoverImage)
  async blocoGetImagemCapa(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.SetCoverImage)
  async blocoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Bloco.Operations.DeleteById)
  async blocoDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() combinedInput: LadesaTypings.BlocoDeleteByIDCombinedInput,
  ) {
    return this.blocoService.blocoDeleteOneById(contextoDeAcesso, { id: combinedInput.params.id });
  }

  //
}
