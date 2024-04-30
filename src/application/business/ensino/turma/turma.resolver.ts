import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import type { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { TurmaOperations } from './dtos';
import { TurmaDto } from './dtos/turma.dto';
import { TurmaService } from './turma.service';

@Resolver(() => TurmaDto)
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}

  //

  @DtoOperationGqlQuery(TurmaOperations.TURMA_FIND_ALL)
  async turmaFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(TurmaOperations.TURMA_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.turmaService.turmaFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(TurmaOperations.TURMA_FIND_ONE_BY_ID)
  async turmaFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(TurmaOperations.TURMA_FIND_ONE_BY_ID)
    dto: Dto.ITurmaFindOneByIdInputDto,
  ) {
    return this.turmaService.turmaFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(TurmaOperations.TURMA_CREATE)
  async turmaCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(TurmaOperations.TURMA_CREATE) dto: Dto.ITurmaInputDto) {
    return this.turmaService.turmaCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(TurmaOperations.TURMA_UPDATE)
  async turmaUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(TurmaOperations.TURMA_UPDATE) dto: Dto.ITurmaUpdateDto) {
    return this.turmaService.turmaUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(TurmaOperations.TURMA_DELETE_ONE_BY_ID)
  async turmaDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(TurmaOperations.TURMA_DELETE_ONE_BY_ID)
    dto: Dto.ITurmaDeleteOneByIdInputDto,
  ) {
    return this.turmaService.turmaDeleteOneById(contextoDeAcesso, dto);
  }
}
