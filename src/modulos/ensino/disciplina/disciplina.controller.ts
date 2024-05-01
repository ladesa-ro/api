import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaOperations } from './dtos';
import {
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationGetFile,
  DtoOperationSaveFile,
  DtoOperationUpdate,
  getSearchInputFromPaginateQuery,
  HttpDtoBody,
  HttpDtoParam,
} from '../../../legacy';

@ApiTags('Disciplinas')
@Controller('/disciplinas')
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get('/')
  @DtoOperationFindAll(DisciplinaOperations.DISCIPLINA_FIND_ALL)
  async disciplinaFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IDisciplinaFindAllResultDto> {
    return this.disciplinaService.disciplinaFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID)
  async disciplinaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(DisciplinaOperations.DISCIPLINA_CREATE)
  async disciplinaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(DisciplinaOperations.DISCIPLINA_CREATE) dto: Dto.IDisciplinaInputDto) {
    return this.disciplinaService.disciplinaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(DisciplinaOperations.DISCIPLINA_UPDATE)
  async disciplinaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_UPDATE, 'id')
    id: string,
    @HttpDtoBody(DisciplinaOperations.DISCIPLINA_UPDATE)
    dto: Omit<Dto.IDisciplinaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IDisciplinaUpdateDto = {
      ...dto,
      id,
    };

    return this.disciplinaService.disciplinaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @DtoOperationGetFile(DisciplinaOperations.DISCIPLINA_GET_IMAGEM_CAPA)
  async disciplinaGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @DtoOperationSaveFile()
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
  @DtoOperationDelete(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID)
  async disciplinaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
