import { Info, Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto, ISearchInputDto } from '@sisgea/spec';
import type { GraphQLResolveInfo } from 'graphql';
import getFieldNames from 'graphql-list-fields';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { DadosEntrada } from '../../../legacy';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  // ========================================================

  @Operacao(Spec.EstadoFindAllOperator())
  async estadoFindAll(
    //
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @DadosEntrada(Spec.EstadoFindAllOperator()) dto: ISearchInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(info as any)
      .filter((i) => i.startsWith('data.'))
      .map((i) => i.slice(i.indexOf('.') + 1));

    return this.estadoService.findAll(clienteAccess, dto, selection);
  }

  // ========================================================

  @Operacao(Spec.EstadoFindOneByUfOperator())
  async estadoFindOneByUf(
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @DadosEntrada(Spec.EstadoFindOneByUfOperator())
    dto: IEstadoFindOneByUfInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(info as any);
    return this.estadoService.findByUfStrict(clienteAccess, dto, selection);
  }

  // ========================================================

  @Operacao(Spec.EstadoFindOneByIdOperator())
  async estadoFindOneById(
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @DadosEntrada(Spec.EstadoFindOneByIdOperator())
    dto: IEstadoFindOneByIdInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(info as any);
    return this.estadoService.findByIdStrict(clienteAccess, dto, selection);
  }

  // ========================================================
}
