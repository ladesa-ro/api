import { Info, Resolver } from '@nestjs/graphql';
import { ICidadeFindOneByIdInputDto, ISearchInputDto } from '@sisgea/spec';
import { GraphQLResolveInfo } from 'graphql';
import getFieldNames from 'graphql-list-fields';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlQuery, GqlDtoInput } from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  // ========================================================

  @DtoOperationGqlQuery(CidadeOperations.CIDADE_FIND_ALL)
  async cidadeFindAll(
    //
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @GqlDtoInput(CidadeOperations.CIDADE_FIND_ALL) dto: ISearchInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info)
      .filter((i) => i.startsWith('data.'))
      .map((i) => i.slice(i.indexOf('.') + 1));

    return this.cidadeService.findAll(clienteAccess, dto, selection);
  }

  // ========================================================

  @DtoOperationGqlQuery(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async cidadeFindById(
    @ContextoDeAcessoGraphQl() clienteAccess: IContextoDeAcesso,
    @GqlDtoInput(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
    dto: ICidadeFindOneByIdInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info);
    return this.cidadeService.findByIdStrict(clienteAccess, dto, selection);
  }
}
