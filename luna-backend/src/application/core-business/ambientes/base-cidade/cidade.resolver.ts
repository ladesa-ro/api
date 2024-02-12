import { Resolver } from '@nestjs/graphql';
import {
  ICidadeFindOneByIdInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoOperationGqlQuery,
  GqlDtoInput,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  @DtoOperationGqlQuery(CidadeOperations.CIDADE_FIND_ALL)
  async cidadeFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.cidadeService.findAll(requestContext);
  }

  @DtoOperationGqlQuery(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async cidadeFindById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlDtoInput(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
    dto: ICidadeFindOneByIdInputDto,
  ) {
    return this.cidadeService.findByIdStrict(requestContext, dto);
  }
}
