import { Info, Resolver } from '@nestjs/graphql';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto, ISearchInputDto } from '@sisgea/spec';
import type { GraphQLResolveInfo } from 'graphql';
import getFieldNames from 'graphql-list-fields';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { EstadoOperations } from './dtos/estado.operations';
import { EstadoService } from './estado.service';
import { DtoOperationGqlQuery, GqlDtoInput } from '../../../legacy';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  // ========================================================

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ALL)
  async estadoFindAll(
    //
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ALL) dto: ISearchInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info)
      .filter((i) => i.startsWith('data.'))
      .map((i) => i.slice(i.indexOf('.') + 1));

    return this.estadoService.findAll(clienteAccess, dto, selection);
  }

  // ========================================================

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
  async estadoFindOneByUf(
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ONE_BY_UF)
    dto: IEstadoFindOneByUfInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info);
    return this.estadoService.findByUfStrict(clienteAccess, dto, selection);
  }

  // ========================================================

  @DtoOperationGqlQuery(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
  async estadoFindOneById(
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @GqlDtoInput(EstadoOperations.ESTADO_FIND_ONE_BY_ID)
    dto: IEstadoFindOneByIdInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info);
    return this.estadoService.findByIdStrict(clienteAccess, dto, selection);
  }

  // ========================================================
}
