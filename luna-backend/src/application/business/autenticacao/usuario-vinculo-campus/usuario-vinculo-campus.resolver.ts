import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { UsuarioVinculoCampusOperations } from './dtos';
import { UsuarioVinculoCampusService } from './usuario-vinculo-campus.service';

export class UsuarioVinculoCampusResolver {
  constructor(
    //
    private usuarioVinculoCampusService: UsuarioVinculoCampusService,
  ) {}

  //

  @DtoOperationGqlQuery(UsuarioVinculoCampusOperations.VINCULO_FIND_ALL)
  async vinculoFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess) {
    return this.usuarioVinculoCampusService.vinculoFindAll(clientAccess);
  }

  @DtoOperationGqlMutation(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS)
  async vinculoSetVinculos(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS) dto: Dto.IUsuarioVinculoCampusSetVinculosInputDto) {
    return this.usuarioVinculoCampusService.vinculoSetVinculos(clientAccess, dto);
  }
}
