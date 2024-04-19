import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
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
import { DiarioProfessorService } from './diario-professor.service';
import { DiarioProfessorOperations } from './dtos';

@ApiTags('DiarioProfessor')
@Controller('/diario-professor')
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get('/')
  @DtoOperationFindAll(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ALL)
  async diarioProfessorFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IDiarioProfessorFindAllResultDto> {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ONE_BY_ID)
  async diarioProfessorFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DiarioProfessorOperations.DIARIO_PROFESSOR_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(DiarioProfessorOperations.DIARIO_PROFESSOR_CREATE)
  async diarioProfessorCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(DiarioProfessorOperations.DIARIO_PROFESSOR_CREATE) dto: Dto.IDiarioProfessorInputDto) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(DiarioProfessorOperations.DIARIO_PROFESSOR_UPDATE)
  async diarioProfessorUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DiarioProfessorOperations.DIARIO_PROFESSOR_UPDATE, 'id')
    id: string,
    @HttpDtoBody(DiarioProfessorOperations.DIARIO_PROFESSOR_UPDATE)
    dto: Omit<Dto.IDiarioProfessorUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IDiarioProfessorUpdateDto = {
      ...dto,
      id,
    };

    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(DiarioProfessorOperations.DIARIO_PROFESSOR_DELETE_ONE_BY_ID)
  async diarioProfessorDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DiarioProfessorOperations.DIARIO_PROFESSOR_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
