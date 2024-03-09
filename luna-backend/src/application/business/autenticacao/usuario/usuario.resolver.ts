import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
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
  async usuarioFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess) {
    return this.usuarioService.usuarioFindAll(clientAccess);
  }

  //

  @DtoOperationGqlQuery(UsuarioOperations.USUARIO_FIND_ONE_BY_ID)
  async usuarioFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(UsuarioOperations.USUARIO_FIND_ONE_BY_ID)
    dto: Dto.IUsuarioFindOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(UsuarioOperations.USUARIO_CREATE)
  async usuarioCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(UsuarioOperations.USUARIO_CREATE) dto: Dto.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(UsuarioOperations.USUARIO_UPDATE)
  async usuarioUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(UsuarioOperations.USUARIO_UPDATE) dto: Dto.IUsuarioUpdateDto) {
    return this.usuarioService.usuarioUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID)
  async usuarioDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID)
    dto: Dto.IUsuarioDeleteOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioDeleteOneById(clientAccess, dto);
  }
}
