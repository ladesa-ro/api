import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { CursoService } from './curso.service';

@ApiTags('Cursos')
@Controller('/cursos')
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get('/')
  @Operacao(Spec.CursoFindAllOperator())
  async cursoFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.CursoFindAllOperator()) dto: Spec.IPaginatedInputDto): Promise<Spec.ICursoFindAllResultDto> {
    return this.cursoService.cursoFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.CursoFindOneByIdOperator())
  async cursoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CursoFindOneByIdOperator())
    { id }: Spec.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.CursoCreateOperator())
  async cursoCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.CursoCreateOperator()) dto: Spec.ICursoInputDto) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.CursoUpdateOperator())
  async cursoUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CursoUpdateOperator())
    { id, ...dto }: Spec.ICursoUpdateDto,
  ) {
    const dtoUpdate: Spec.ICursoUpdateDto = {
      ...dto,
      id,
    };

    return this.cursoService.cursoUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @Operacao(Spec.CursoGetImagemCapaOperator())
  async cursoGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CursoFindOneByIdOperator())
    { id }: Spec.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.CursoSetImagemCapaOperator())
  async cursoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cursoService.cursoUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.CursoDeleteOperator())
  async cursoDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.CursoFindOneByIdOperator())
    { id }: Spec.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
