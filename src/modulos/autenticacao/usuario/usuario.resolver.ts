import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaGql, Operacao } from '../../../especificacao';
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
  async usuarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.UsuarioFindAllOperator()) dto: Spec.IPaginatedInputDto) {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.UsuarioFindOneByIdOperator())
  async usuarioFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.UsuarioFindOneByIdOperator())
    dto: Spec.IUsuarioFindOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.UsuarioCreateOperator())
  async usuarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.UsuarioCreateOperator()) dto: Spec.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.UsuarioUpdateOperator())
  async usuarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaGql(Spec.UsuarioUpdateOperator()) dto: Spec.IUsuarioUpdateDto) {
    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.UsuarioDeleteOperator())
  async usuarioDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaGql(Spec.UsuarioDeleteOperator())
    dto: Spec.IUsuarioDeleteOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, dto);
  }
}
