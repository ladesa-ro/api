import { Resolver } from '@nestjs/graphql';
import {
  ICidadeFindOneByIdInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoGqlInput,
  DtoOperationGql,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import {
  CidadeFindOneByIdInputDto,
  CidadeFindOneByIdInputValidationContract,
  CidadeOperations,
} from './dtos';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  @DtoOperationGql(CidadeOperations.CIDADE_FIND_ALL)
  async cidadeFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.cidadeService.findAll(requestContext);
  }

  @DtoOperationGql(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async cidadeFindById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @DtoGqlInput({
      type: () => CidadeFindOneByIdInputDto,
      validationContract: CidadeFindOneByIdInputValidationContract,
    })
    dto: ICidadeFindOneByIdInputDto,
  ) {
    return this.cidadeService.findByIdStrict(requestContext, dto);
  }
}
