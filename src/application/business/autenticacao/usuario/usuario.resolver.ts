import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { UsuarioDto, UsuarioOperations } from './dtos';
import { UsuarioService } from './usuario.service';

@Resolver(() => UsuarioDto)
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}

  //

  @DtoOperationGqlQuery(UsuarioOperations.USUARIO_FIND_ALL)
  async usuarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(UsuarioOperations.USUARIO_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(UsuarioOperations.USUARIO_FIND_ONE_BY_ID)
  async usuarioFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(UsuarioOperations.USUARIO_FIND_ONE_BY_ID)
    dto: Dto.IUsuarioFindOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(UsuarioOperations.USUARIO_CREATE)
  async usuarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(UsuarioOperations.USUARIO_CREATE) dto: Dto.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(UsuarioOperations.USUARIO_UPDATE)
  async usuarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(UsuarioOperations.USUARIO_UPDATE) dto: Dto.IUsuarioUpdateDto) {
    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID)
  async usuarioDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID)
    dto: Dto.IUsuarioDeleteOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, dto);
  }
}
