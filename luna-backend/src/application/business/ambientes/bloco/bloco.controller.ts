import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import {
  ClientAccessHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';
import { BlocoService } from './bloco.service';
import { BlocoOperations } from './dtos/bloco.operations';

@ApiTags('Blocos')
@Controller('/blocos')
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get('/')
  @DtoOperationFindAll(BlocoOperations.BLOCO_FIND_ALL)
  async blocoFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.IBlocoFindAllResultDto> {
    return this.blocoService.blocoFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(BlocoOperations.BLOCO_FIND_ONE_BY_ID)
  async blocoFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(BlocoOperations.BLOCO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(BlocoOperations.BLOCO_CREATE)
  async blocoCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(BlocoOperations.BLOCO_CREATE) dto: Dto.IBlocoInputDto) {
    return this.blocoService.blocoCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(BlocoOperations.BLOCO_UPDATE)
  async blocoUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(BlocoOperations.BLOCO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(BlocoOperations.BLOCO_UPDATE)
    dto: Omit<Dto.IBlocoUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IBlocoUpdateDto = {
      ...dto,
      id,
    };

    return this.blocoService.blocoUpdate(clientAccess, dtoUpdate);
  }

  @Put('/:id/imagens/capa')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024, files: 1 } }))
  async blocoImagemCapaSave(@ClientAccessHttp() clientAccess: IClientAccess, @Param('id', ParseUUIDPipe) id: string, @UploadedFile() file: Express.Multer.File) {
    return this.blocoService.blocoUpdateImagemCapa(clientAccess, { id }, file);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(BlocoOperations.BLOCO_DELETE_ONE_BY_ID)
  async blocoDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(BlocoOperations.BLOCO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.blocoService.blocoDeleteOneById(clientAccess, { id });
  }

  //
}
