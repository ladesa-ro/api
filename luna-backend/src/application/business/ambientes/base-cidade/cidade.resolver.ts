import { Resolver } from '@nestjs/graphql';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlQuery, GqlDtoInput } from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';
import { ICidadeFindOneByIdInputDto } from '../../(dtos)';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  @DtoOperationGqlQuery(CidadeOperations.CIDADE_FIND_ALL)
  async cidadeFindAll(@ClientAccessGraphQl() clienteAccess: IClientAccess) {
    return this.cidadeService.findAll(clienteAccess);
  }

  @DtoOperationGqlQuery(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async cidadeFindById(
    @ClientAccessGraphQl() clienteAccess: IClientAccess,
    @GqlDtoInput(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
    dto: ICidadeFindOneByIdInputDto,
  ) {
    return this.cidadeService.findByIdStrict(clienteAccess, dto);
  }
}
