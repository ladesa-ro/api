import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DtoOperationCreate, DtoOperationDelete, DtoOperationFindAll, DtoOperationFindOne, DtoOperationUpdate, getSearchInputFromPaginateQuery, HttpDtoBody, HttpDtoParam } from '../../../legacy';
import { DiarioService } from './diario.service';
import { DiarioOperations } from './dtos';

@ApiTags('Diarios')
@Controller('/diarios')
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get('/')
  @DtoOperationFindAll(DiarioOperations.DIARIO_FIND_ALL)
  async diarioFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IDiarioFindAllResultDto> {
    return this.diarioService.diarioFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(DiarioOperations.DIARIO_FIND_ONE_BY_ID)
  async diarioFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DiarioOperations.DIARIO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(DiarioOperations.DIARIO_CREATE)
  async diarioCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(DiarioOperations.DIARIO_CREATE) dto: Dto.IDiarioInputDto) {
    return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(DiarioOperations.DIARIO_UPDATE)
  async diarioUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DiarioOperations.DIARIO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(DiarioOperations.DIARIO_UPDATE)
    dto: Omit<Dto.IDiarioUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IDiarioUpdateDto = {
      ...dto,
      id,
    };

    return this.diarioService.diarioUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(DiarioOperations.DIARIO_DELETE_ONE_BY_ID)
  async diarioDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(DiarioOperations.DIARIO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.diarioService.diarioDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
