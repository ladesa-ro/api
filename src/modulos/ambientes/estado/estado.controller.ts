import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import type { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoHttp, DtoOperationFindAll, DtoOperationFindOne, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../../infraestrutura';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';

@ApiTags('Estados')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @DtoOperationFindAll(EstadoOperations.ESTADO_FIND_ALL)
  async findAll(@ContextoDeAcessoHttp() clienteAccess: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IEstadoFindAllResultDto> {
    return this.estadoService.findAll(clienteAccess, getSearchInputFromPaginateQuery(query));
  }

  @Get('/uf/:uf')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  @ApiParam({
    name: 'uf',
    description: 'Sigla do estado.',
  })
  async findByUf(
    @ContextoDeAcessoHttp() clienteAccess: IContextoDeAcesso,
    @HttpDtoParam(EstadoOperations.ESTADO_FIND_ONE_BY_UF, 'uf')
    uf: string,
  ) {
    return this.estadoService.findByUfStrict(clienteAccess, { uf });
  }

  @Get('/:id')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  @ApiParam({
    name: 'id',
    description: 'ID IBGE do estado.',
  })
  async findById(
    @ContextoDeAcessoHttp() clienteAccess: IContextoDeAcesso,
    @HttpDtoParam(EstadoOperations.ESTADO_FIND_ONE_BY_ID, 'id')
    id: number,
  ) {
    return this.estadoService.findByIdStrict(clienteAccess, { id });
  }
}
