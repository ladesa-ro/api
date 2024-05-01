import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DtoOperationGqlMutation, DtoOperationGqlQuery, GqlDtoInput } from '../../../legacy';
import { AmbienteService } from './ambiente.service';
import { AmbienteDto, AmbienteOperations } from './dtos';

@Resolver(() => AmbienteDto)
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}

  //

  @DtoOperationGqlQuery(AmbienteOperations.AMBIENTE_FIND_ALL)
  async ambienteFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(AmbienteOperations.AMBIENTE_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.ambienteService.ambienteFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID)
  async ambienteFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(AmbienteOperations.AMBIENTE_FIND_ONE_BY_ID)
    dto: Dto.IAmbienteFindOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(AmbienteOperations.AMBIENTE_CREATE)
  async ambienteCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(AmbienteOperations.AMBIENTE_CREATE) dto: Dto.IAmbienteInputDto) {
    return this.ambienteService.ambienteCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(AmbienteOperations.AMBIENTE_UPDATE)
  async ambienteUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(AmbienteOperations.AMBIENTE_UPDATE) dto: Dto.IAmbienteUpdateDto) {
    return this.ambienteService.ambienteUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID)
  async ambienteDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(AmbienteOperations.AMBIENTE_DELETE_ONE_BY_ID)
    dto: Dto.IAmbienteDeleteOneByIdInputDto,
  ) {
    return this.ambienteService.ambienteDeleteOneById(contextoDeAcesso, dto);
  }
}
