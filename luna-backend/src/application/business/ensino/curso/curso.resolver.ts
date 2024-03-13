import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { CursoOperations } from './dtos';
import { CursoDto } from './dtos/curso.dto';
import { CursoService } from './curso.service';

@Resolver(() => CursoDto)
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}

  //

  @DtoOperationGqlQuery(CursoOperations.CURSO_FIND_ALL)
  async cursoFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CursoOperations.CURSO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.cursoService.cursoFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(CursoOperations.CURSO_FIND_ONE_BY_ID)
  async cursoFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CursoOperations.CURSO_FIND_ONE_BY_ID)
    dto: Dto.ICursoFindOneByIdInputDto,
  ) {
    return this.cursoService.cursoFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(CursoOperations.CURSO_CREATE)
  async cursoCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CursoOperations.CURSO_CREATE) dto: Dto.ICursoInputDto) {
    return this.cursoService.cursoCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(CursoOperations.CURSO_UPDATE)
  async cursoUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(CursoOperations.CURSO_UPDATE) dto: Dto.ICursoUpdateDto) {
    return this.cursoService.cursoUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(CursoOperations.CURSO_DELETE_ONE_BY_ID)
  async cursoDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(CursoOperations.CURSO_DELETE_ONE_BY_ID)
    dto: Dto.ICursoDeleteOneByIdInputDto,
  ) {
    return this.cursoService.cursoDeleteOneById(clientAccess, dto);
  }
}
