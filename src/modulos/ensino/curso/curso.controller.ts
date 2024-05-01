import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import type { IContextoDeAcesso } from '../../../../domain/contexto-de-acesso/IContextoDeAcesso';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationGetFile,
  DtoOperationSaveFile,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infraestrutura';
import { CursoService } from './curso.service';
import { CursoOperations } from './dtos';

@ApiTags('Cursos')
@Controller('/cursos')
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get('/')
  @DtoOperationFindAll(CursoOperations.CURSO_FIND_ALL)
  async cursoFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.ICursoFindAllResultDto> {
    return this.cursoService.cursoFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CursoOperations.CURSO_FIND_ONE_BY_ID)
  async cursoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CursoOperations.CURSO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(CursoOperations.CURSO_CREATE)
  async cursoCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(CursoOperations.CURSO_CREATE) dto: Dto.ICursoInputDto) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(CursoOperations.CURSO_UPDATE)
  async cursoUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CursoOperations.CURSO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(CursoOperations.CURSO_UPDATE)
    dto: Omit<Dto.ICursoUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ICursoUpdateDto = {
      ...dto,
      id,
    };

    return this.cursoService.cursoUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @DtoOperationGetFile(CursoOperations.CURSO_GET_IMAGEM_CAPA)
  async cursoGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CursoOperations.CURSO_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.cursoService.cursoGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @DtoOperationSaveFile()
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
  @DtoOperationDelete(CursoOperations.CURSO_DELETE_ONE_BY_ID)
  async cursoDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CursoOperations.CURSO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
