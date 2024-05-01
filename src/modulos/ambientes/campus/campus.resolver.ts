import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DtoOperationGqlMutation, DtoOperationGqlQuery, GqlDtoInput } from '../../../legacy';
import { CampusService } from './campus.service';
import { CampusDto, CampusOperations } from './dtos';

@Resolver(() => CampusDto)
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ALL)
  async campusFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CampusOperations.CAMPUS_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.campusService.campusFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
  async campusFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(CampusOperations.CAMPUS_FIND_ONE_BY_ID)
    dto: Dto.ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_CREATE)
  async campusCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CampusOperations.CAMPUS_CREATE) dto: Dto.ICampusInputDto) {
    return this.campusService.campusCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_UPDATE)
  async campusUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CampusOperations.CAMPUS_UPDATE) dto: Dto.ICampusUpdateDto) {
    return this.campusService.campusUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
  async campusDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(CampusOperations.CAMPUS_DELETE_ONE_BY_ID)
    dto: Dto.ICampusDeleteOneByIdInputDto,
  ) {
    return this.campusService.campusDeleteOneById(contextoDeAcesso, dto);
  }
}
