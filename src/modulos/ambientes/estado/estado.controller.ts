import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../legacy';
import { EstadoService } from './estado.service';

@ApiTags('Estados')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @Operacao(Spec.EstadoFindAllOperator())
  async findAll(@ContextoDeAcessoHttp() clienteAccess: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Spec.IEstadoFindAllResultDto> {
    return this.estadoService.findAll(clienteAccess, getSearchInputFromPaginateQuery(query));
  }

  @Get('/uf/:uf')
  @Operacao(Spec.EstadoFindOneByUfOperator())
  @ApiParam({
    name: 'uf',
    description: 'Sigla do estado.',
  })
  async findByUf(
    @ContextoDeAcessoHttp() clienteAccess: IContextoDeAcesso,
    @HttpDtoParam(Spec.EstadoFindOneByUfOperator(), 'uf')
    uf: string,
  ) {
    return this.estadoService.findByUfStrict(clienteAccess, { uf });
  }

  @Get('/:id')
  @Operacao(Spec.EstadoFindOneByIdOperator())
  @ApiParam({
    name: 'id',
    description: 'ID IBGE do estado.',
  })
  async findById(
    @ContextoDeAcessoHttp() clienteAccess: IContextoDeAcesso,
    @HttpDtoParam(Spec.EstadoFindOneByIdOperator(), 'id')
    id: number,
  ) {
    return this.estadoService.findByIdStrict(clienteAccess, { id });
  }
}
