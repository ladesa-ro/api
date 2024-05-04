import { Info, Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import type { GraphQLResolveInfo } from 'graphql';
import getFieldNames from 'graphql-list-fields';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { DadosEntradaGql } from '../../../legacy';
import { CidadeService } from './cidade.service';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  // ========================================================

  @Operacao(Spec.CidadeFindAllOperator())
  async cidadeFindAll(@Info() info: GraphQLResolveInfo, @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso, @DadosEntradaGql(Spec.CidadeFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    const selection = getFieldNames(info as any)
      .filter((i) => i.startsWith('data.'))
      .map((i) => i.slice(i.indexOf('.') + 1));

    return this.cidadeService.findAll(clienteAccess, dto, selection);
  }

  // ========================================================

  @Operacao(Spec.CidadeFindOneByIdOperator())
  async cidadeFindById(
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @DadosEntradaGql(Spec.CidadeFindOneByIdOperator())
    dto: Spec.ICidadeFindOneByIdInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(info as any);
    return this.cidadeService.findByIdStrict(clienteAccess, dto, selection);
  }
}
