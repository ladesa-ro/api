import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IClientAccess } from '../../../../domain';
import { ClientAccessHttp, DtoOperationFindAll, DtoOperationFindOne, HttpDtoParam } from '../../../../infrastructure';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';
import { IEstadoFindOneResultDto } from '../../(dtos)';

@ApiTags('ambientes')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @DtoOperationFindAll(EstadoOperations.ESTADO_FIND_ALL)
  async findAll(@ClientAccessHttp() clienteAccess: IClientAccess): Promise<IEstadoFindOneResultDto[]> {
    return this.estadoService.findAll(clienteAccess);
  }

  @Get('/uf/:uf')
  @DtoOperationFindOne(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  @ApiParam({
    name: 'uf',
    description: 'Sigla do estado.',
  })
  async findByUf(
    @ClientAccessHttp() clienteAccess: IClientAccess,
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
    @ClientAccessHttp() clienteAccess: IClientAccess,
    @HttpDtoParam(EstadoOperations.ESTADO_FIND_ONE_BY_ID, 'id')
    id: number,
  ) {
    return this.estadoService.findByIdStrict(clienteAccess, { id });
  }
}
