import * as Dto from '@sisgea/spec';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
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
  async vinculoFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso) {
    return this.usuarioVinculoCampusService.vinculoFindAll(contextoDeAcesso);
  }

  @DtoOperationGqlMutation(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS)
  async vinculoSetVinculos(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS) dto: Dto.IUsuarioVinculoCampusSetVinculosInputDto,
  ) {
    return this.usuarioVinculoCampusService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
