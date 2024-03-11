import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { BlocoService } from './bloco.service';
import { BlocoDto, BlocoOperations } from './dtos';

@Resolver(() => BlocoDto)
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  @DtoOperationGqlQuery(BlocoOperations.BLOCO_FIND_ALL)
  async blocoFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(BlocoOperations.BLOCO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.blocoService.blocoFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(BlocoOperations.BLOCO_FIND_ONE_BY_ID)
  async blocoFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(BlocoOperations.BLOCO_FIND_ONE_BY_ID)
    dto: Dto.IBlocoFindOneByIdInputDto,
  ) {
    return this.blocoService.blocoFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(BlocoOperations.BLOCO_CREATE)
  async blocoCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(BlocoOperations.BLOCO_CREATE) dto: Dto.IBlocoInputDto) {
    return this.blocoService.blocoCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(BlocoOperations.BLOCO_UPDATE)
  async blocoUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(BlocoOperations.BLOCO_UPDATE) dto: Dto.IBlocoUpdateDto) {
    return this.blocoService.blocoUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(BlocoOperations.BLOCO_DELETE_ONE_BY_ID)
  async blocoDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(BlocoOperations.BLOCO_DELETE_ONE_BY_ID)
    dto: Dto.IBlocoDeleteOneByIdInputDto,
  ) {
    return this.blocoService.blocoDeleteOneById(clientAccess, dto);
  }
}
