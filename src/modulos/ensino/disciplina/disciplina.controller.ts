import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DisciplinaService } from './disciplina.service';

@ApiTags('Disciplinas')
@Controller('/disciplinas')
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.List)
  async disciplinaFindAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DisciplinaListCombinedInput,
  ): Promise<LadesaTypings.DisciplinaListCombinedSuccessOutput['body']> {
    return this.disciplinaService.disciplinaFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.FindById)
  async disciplinaFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DisciplinaFindByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.Create)
  async disciplinaCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DisciplinaCreateCombinedInput,
  ) {
    return this.disciplinaService.disciplinaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.Create)
  async disciplinaUpdate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(contextoDeAcesso, dto);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.GetCoverImage)
  async disciplinaGetImagemCapa(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.SetCoverImage)
  async disciplinaImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Disciplina.Operations.DeleteById)
  async disciplinaDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.DisciplinaDeleteByIDCombinedInput,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
