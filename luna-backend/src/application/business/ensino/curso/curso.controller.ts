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
import { CursoService } from './curso.service';
import { CursoOperations } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiProduces('application/octet-stream', 'image/jpeg')
  @DtoOperationFindOne(CursoOperations.CURSO_GET_IMAGEM_CAPA)
  async cursoGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CursoOperations.CURSO_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.cursoService.cursoGetImagemCapa(contextoDeAcesso, id);
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
