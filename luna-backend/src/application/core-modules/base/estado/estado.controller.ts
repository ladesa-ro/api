import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  IBaseEstadoFindOneResultDto,
  IRequestContext,
} from '../../../../domain';
import { ResolveRequestContextHttp } from '../../../../infrastructure';
import { EstadoFindOneResultDto } from './dtos';
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
    @Param('uf') uf: string,
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
    @Param('id') id: number,
  ) {
    return this.estadoService.findByIdStrict(requestContext, { id });
  }
}
