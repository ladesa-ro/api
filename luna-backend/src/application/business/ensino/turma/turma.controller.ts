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
import { TurmaOperations } from './dtos';
import { TurmaService } from './turma.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Turmas')
@Controller('/turmas')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get('/')
  @DtoOperationFindAll(TurmaOperations.TURMA_FIND_ALL)
  async turmaFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.ITurmaFindAllResultDto> {
    return this.turmaService.turmaFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(TurmaOperations.TURMA_FIND_ONE_BY_ID)
  async turmaFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(TurmaOperations.TURMA_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.turmaService.turmaFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(TurmaOperations.TURMA_CREATE)
  async turmaCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(TurmaOperations.TURMA_CREATE) dto: Dto.ITurmaInputDto) {
    return this.turmaService.turmaCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(TurmaOperations.TURMA_UPDATE)
  async turmaUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(TurmaOperations.TURMA_UPDATE, 'id')
    id: string,
    @HttpDtoBody(TurmaOperations.TURMA_UPDATE)
    dto: Omit<Dto.ITurmaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ITurmaUpdateDto = {
      ...dto,
      id,
    };

    return this.turmaService.turmaUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @ApiProduces('application/octet-stream', 'image/jpeg')
  @DtoOperationFindOne(TurmaOperations.TURMA_GET_IMAGEM_CAPA)
  async turmaGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(TurmaOperations.TURMA_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.turmaService.turmaGetImagemCapa(contextoDeAcesso, id);
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
  @DtoOperationDelete(TurmaOperations.TURMA_DELETE_ONE_BY_ID)
  async turmaDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(TurmaOperations.TURMA_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.turmaService.turmaDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
