import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { DiarioService } from './diario.service';
import { DiarioOperations } from './dtos';
import { DiarioDto } from './dtos/diario.dto';

@Resolver(() => DiarioDto)
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}

  //

  @DtoOperationGqlQuery(DiarioOperations.DIARIO_FIND_ALL)
  async diarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(DiarioOperations.DIARIO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.diarioService.diarioFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(DiarioOperations.DIARIO_FIND_ONE_BY_ID)
  async diarioFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioOperations.DIARIO_FIND_ONE_BY_ID)
    dto: Dto.IDiarioFindOneByIdInputDto,
  ) {
    return this.diarioService.diarioFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(DiarioOperations.DIARIO_CREATE)
  async diarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(DiarioOperations.DIARIO_CREATE) dto: Dto.IDiarioInputDto) {
    return this.diarioService.diarioCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DiarioOperations.DIARIO_UPDATE)
  async diarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(DiarioOperations.DIARIO_UPDATE) dto: Dto.IDiarioUpdateDto) {
    return this.diarioService.diarioUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(DiarioOperations.DIARIO_DELETE_ONE_BY_ID)
  async diarioDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(DiarioOperations.DIARIO_DELETE_ONE_BY_ID)
    dto: Dto.IDiarioDeleteOneByIdInputDto,
  ) {
    return this.diarioService.diarioDeleteOneById(contextoDeAcesso, dto);
  }
}
