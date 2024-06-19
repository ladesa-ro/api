import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { CursoService } from './curso.service';

@ApiTags('Cursos')
@Controller('/cursos')
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Curso.Operations.List)
  async cursoFindAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoListCombinedInput,
  ): Promise<LadesaTypings.CursoListCombinedSuccessOutput['body']> {
    return this.cursoService.cursoFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Curso.Operations.FindById)
  async cursoFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoCreateCombinedInput,
  ) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Curso.Operations.Create)
  async cursoUpdate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @CombinedInput() dto: LadesaTypings.CursoUpdateByIDCombinedInput) {
    return this.cursoService.cursoUpdate(contextoDeAcesso, dto);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Curso.Operations.GetCoverImage)
  async cursoGetImagemCapa(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Curso.Operations.SetCoverImage)
  async cursoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Curso.Operations.DeleteById)
  async cursoDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CursoFindByIDCombinedInput,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
