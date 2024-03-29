import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaOperations } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiProduces('application/octet-stream', 'image/jpeg')
  @DtoOperationFindOne(DisciplinaOperations.DISCIPLINA_GET_IMAGEM_CAPA)
  async disciplinaGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
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
