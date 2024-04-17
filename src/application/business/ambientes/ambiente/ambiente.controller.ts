import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationGetFile,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';
import { DtoOperationSaveFile } from '../../../../infrastructure/api-documentate/DtoOperation';
import { AmbienteService } from './ambiente.service';
import { AmbienteOperations } from './dtos/ambiente.operations';

@ApiTags('Ambientes')
@Controller('/ambientes')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  //

  @Get('/')
  @DtoOperationFindAll(AmbienteOperations.AMBIENTE_FIND_ALL)
  async ambienteFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IAmbienteFindAllResultDto> {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID)
  async ambienteFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(AmbienteOperations.AMBIENTE_CREATE)
  async ambienteCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(AmbienteOperations.AMBIENTE_CREATE) dto: Dto.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(AmbienteOperations.AMBIENTE_UPDATE)
  async ambienteUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_UPDATE, 'id')
    id: string,
    @HttpDtoBody(AmbienteOperations.AMBIENTE_UPDATE)
    dto: Omit<Dto.IAmbienteUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IAmbienteUpdateDto = {
      ...dto,
      id,
    };

    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @DtoOperationGetFile(AmbienteOperations.AMBIENTE_GET_IMAGEM_CAPA)
  async blocoGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @DtoOperationSaveFile()
  async blocoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID)
  async ambienteDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
