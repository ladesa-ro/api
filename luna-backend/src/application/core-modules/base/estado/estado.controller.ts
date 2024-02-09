import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  IBaseEstadoFindOneResultDto,
  IRequestContext,
} from '../../../../domain';
import {
  HttpParamYup,
  ResolveRequestContextHttp,
  getSchemaField,
} from '../../../../infrastructure';
import {
  EstadoFindOneByIdInputContract,
  EstadoFindOneByUfInputContract,
  EstadoFindOneResultDto,
} from './dtos';
import { EstadoService } from './estado.service';

@ApiTags('ambientes')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [EstadoFindOneResultDto],
    description:
      'Lista de todos os estados brasileiros cadastrados no sistema.',
  })
  async findAll(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
  ): Promise<IBaseEstadoFindOneResultDto[]> {
    return this.estadoService.findAll(requestContext);
  }

  @Get('/uf-:uf')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: EstadoFindOneResultDto,
    description: 'Realiza a consulta a um estado por sigla da UF.',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro não encontrado.',
  })
  @ApiParam({
    name: 'uf',
    description: 'Sigla do estado.',
  })
  async findByUf(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParamYup('uf', getSchemaField(EstadoFindOneByUfInputContract(), 'uf'))
    uf: string,
  ) {
    return this.estadoService.findByUfStrict(requestContext, { uf });
  }

  @Get('/id-:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: EstadoFindOneResultDto,
    description: 'Retorna a consulta a um estado por ID IBGE.',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro não encontrado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID IBGE do estado.',
  })
  async findById(
    @ResolveRequestContextHttp() requestContext: IRequestContext,
    @HttpParamYup('id', getSchemaField(EstadoFindOneByIdInputContract(), 'id'))
    id: number,
  ) {
    return this.estadoService.findByIdStrict(requestContext, { id });
  }
}
