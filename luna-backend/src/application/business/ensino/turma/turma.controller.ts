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
import { TurmaOperations } from './dtos';
import { TurmaService } from './turma.service';

@ApiTags('Turmas')
@Controller('/turmas')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get('/')
  @DtoOperationFindAll(TurmaOperations.TURMA_FIND_ALL)
  async turmaFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.ITurmaFindAllResultDto> {
    return this.turmaService.turmaFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(TurmaOperations.TURMA_FIND_ONE_BY_ID)
  async turmaFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(TurmaOperations.TURMA_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.turmaService.turmaFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(TurmaOperations.TURMA_CREATE)
  async turmaCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(TurmaOperations.TURMA_CREATE) dto: Dto.ITurmaInputDto) {
    return this.turmaService.turmaCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(TurmaOperations.TURMA_UPDATE)
  async turmaUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(TurmaOperations.TURMA_UPDATE, 'id')
    id: string,
    @HttpDtoBody(TurmaOperations.TURMA_UPDATE)
    dto: Omit<Dto.ITurmaUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.ITurmaUpdateDto = {
      ...dto,
      id,
    };

    return this.turmaService.turmaUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(TurmaOperations.TURMA_DELETE_ONE_BY_ID)
  async turmaDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(TurmaOperations.TURMA_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.turmaService.turmaDeleteOneById(clientAccess, { id });
  }

  //
}
