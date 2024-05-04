import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { DisciplinaService } from './disciplina.service';

@ApiTags('Disciplinas')
@Controller('/disciplinas')
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get('/')
  @Operacao(Spec.DisciplinaFindAllOperator())
  async disciplinaFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DisciplinaFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IDisciplinaFindAllResultDto> {
    return this.disciplinaService.disciplinaFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.DisciplinaFindOneByIdOperator())
  async disciplinaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DisciplinaFindOneByIdOperator())
    { id }: Spec.IDisciplinaFindOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.DisciplinaCreateOperator())
  async disciplinaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.DisciplinaCreateOperator()) dto: Spec.IDisciplinaInputDto) {
    return this.disciplinaService.disciplinaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.DisciplinaUpdateOperator())
  async disciplinaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DisciplinaUpdateOperator())
    { id, ...dto }: Spec.IDisciplinaUpdateDto,
  ) {
    const dtoUpdate: Spec.IDisciplinaUpdateDto = {
      ...dto,
      id,
    };

    return this.disciplinaService.disciplinaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @Operacao(Spec.DisciplinaGetImagemCapaOperator())
  async disciplinaGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DisciplinaFindOneByIdOperator())
    { id }: Spec.IDisciplinaFindOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.DisciplinaSetImagemCapaOperator())
  async disciplinaImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.DisciplinaDeleteOperator())
  async disciplinaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.DisciplinaFindOneByIdOperator())
    { id }: Spec.IDisciplinaFindOneByIdInputDto,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
