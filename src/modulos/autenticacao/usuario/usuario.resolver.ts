import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { UsuarioDto } from './usuario.dtos';
import { UsuarioService } from './usuario.service';

@Resolver(() => UsuarioDto)
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}

  //

  @Operacao(Spec.UsuarioFindAllOperator())
  async usuarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.UsuarioFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.UsuarioFindOneByIdOperator())
  async usuarioFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.UsuarioFindOneByIdOperator())
    dto: Spec.IUsuarioFindOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.UsuarioCreateOperator())
  async usuarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.UsuarioCreateOperator()) dto: Spec.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.UsuarioUpdateOperator())
  async usuarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.UsuarioUpdateOperator()) dto: Spec.IUsuarioUpdateDto) {
    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.UsuarioDeleteOperator())
  async usuarioDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.UsuarioDeleteOperator())
    dto: Spec.IUsuarioDeleteOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, dto);
  }
}
