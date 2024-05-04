import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody, HttpDtoParam } from '../../../legacy';
import { TurmaService } from './turma.service';

@ApiTags('Turmas')
@Controller('/turmas')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get('/')
  @Operacao(Spec.TurmaFindAllOperator())
  async turmaFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.TurmaFindAllOperator()) dto: Spec.IPaginatedInputDto): Promise<Spec.ITurmaFindAllResultDto> {
    return this.turmaService.turmaFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.TurmaFindOneByIdOperator())
  async turmaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.TurmaFindOneByIdOperator(), 'id')
    id: string,
  ) {
    return this.turmaService.turmaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.TurmaCreateOperator())
  async turmaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.TurmaCreateOperator()) dto: Spec.ITurmaInputDto) {
    return this.turmaService.turmaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.TurmaUpdateOperator())
  async turmaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.TurmaUpdateOperator(), 'id')
    id: string,
    @HttpDtoBody(Spec.TurmaUpdateOperator())
    dto: Omit<Spec.ITurmaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Spec.ITurmaUpdateDto = {
      ...dto,
      id,
    };

    return this.turmaService.turmaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @Operacao(Spec.TurmaGetImagemCapaOperator())
  async turmaGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.TurmaGetImagemCapaOperator(), 'id')
    id: string,
  ) {
    return this.turmaService.turmaGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.TurmaSetImagemCapaOperator())
  async turmaImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.turmaService.turmaUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.TurmaDeleteOperator())
  async turmaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.TurmaDeleteOperator(), 'id')
    id: string,
  ) {
    return this.turmaService.turmaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
