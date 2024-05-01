import * as Dto from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DtoOperationGqlMutation, DtoOperationGqlQuery, GqlDtoInput } from '../../../legacy';
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
