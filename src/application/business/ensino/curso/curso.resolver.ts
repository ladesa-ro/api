import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { CursoService } from './curso.service';
import { CursoOperations } from './dtos';
import { CursoDto } from './dtos/curso.dto';

@Resolver(() => CursoDto)
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}

  //

  @DtoOperationGqlQuery(CursoOperations.CURSO_FIND_ALL)
  async cursoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CursoOperations.CURSO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.cursoService.cursoFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(CursoOperations.CURSO_FIND_ONE_BY_ID)
  async cursoFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(CursoOperations.CURSO_FIND_ONE_BY_ID)
    dto: Dto.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(CursoOperations.CURSO_CREATE)
  async cursoCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CursoOperations.CURSO_CREATE) dto: Dto.ICursoInputDto) {
    return this.cursoService.cursoCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(CursoOperations.CURSO_UPDATE)
  async cursoUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(CursoOperations.CURSO_UPDATE) dto: Dto.ICursoUpdateDto) {
    return this.cursoService.cursoUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(CursoOperations.CURSO_DELETE_ONE_BY_ID)
  async cursoDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(CursoOperations.CURSO_DELETE_ONE_BY_ID)
    dto: Dto.ICursoDeleteOneByIdInputDto,
  ) {
    return this.cursoService.cursoDeleteOneById(contextoDeAcesso, dto);
  }
}
