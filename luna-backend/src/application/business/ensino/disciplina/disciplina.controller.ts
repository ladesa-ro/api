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
import { DisciplinaOperations } from './dtos';
import { DisciplinaService } from './disciplina.service';

@ApiTags('Disciplinas')
@Controller('/disciplinas')
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get('/')
  @DtoOperationFindAll(DisciplinaOperations.DISCIPLINA_FIND_ALL)
  async disciplinaFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.IDisciplinaFindAllResultDto> {
    return this.disciplinaService.disciplinaFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID)
  async disciplinaFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(DisciplinaOperations.DISCIPLINA_CREATE)
  async disciplinaCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(DisciplinaOperations.DISCIPLINA_CREATE) dto: Dto.IDisciplinaInputDto) {
    return this.disciplinaService.disciplinaCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(DisciplinaOperations.DISCIPLINA_UPDATE)
  async disciplinaUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_UPDATE, 'id')
    id: string,
    @HttpDtoBody(DisciplinaOperations.DISCIPLINA_UPDATE)
    dto: Omit<Dto.IDisciplinaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IDisciplinaUpdateDto = {
      ...dto,
      id,
    };

    return this.disciplinaService.disciplinaUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID)
  async disciplinaDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(DisciplinaOperations.DISCIPLINA_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(clientAccess, { id });
  }

  //
}
