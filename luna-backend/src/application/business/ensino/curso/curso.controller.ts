import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
import { CursoOperations } from './dtos';
import { CursoService } from './curso.service';

@ApiTags('Cursos')
@Controller('/cursos')
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get('/')
  @DtoOperationFindAll(CursoOperations.CURSO_FIND_ALL)
  async cursoFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.ICursoFindAllResultDto> {
    return this.cursoService.cursoFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(CursoOperations.CURSO_FIND_ONE_BY_ID)
  async cursoFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CursoOperations.CURSO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.cursoService.cursoFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(CursoOperations.CURSO_CREATE)
  async cursoCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(CursoOperations.CURSO_CREATE) dto: Dto.ICursoInputDto) {
    return this.cursoService.cursoCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(CursoOperations.CURSO_UPDATE)
  async cursoUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CursoOperations.CURSO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(CursoOperations.CURSO_UPDATE)
    dto: Omit<Dto.ICursoUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ICursoUpdateDto = {
      ...dto,
      id,
    };

    return this.cursoService.cursoUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(CursoOperations.CURSO_DELETE_ONE_BY_ID)
  async cursoDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CursoOperations.CURSO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.cursoService.cursoDeleteOneById(clientAccess, { id });
  }

  //
}
