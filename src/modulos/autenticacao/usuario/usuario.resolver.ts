import { Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
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

  @Operacao(Dto.UsuarioFindAllOperator())
  async usuarioFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Dto.UsuarioFindAllOperator()) dto: Dto.ISearchInputDto) {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Dto.UsuarioFindOneByIdOperator())
  async usuarioFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Dto.UsuarioFindOneByIdOperator())
    dto: Dto.IUsuarioFindOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Dto.UsuarioCreateOperator())
  async usuarioCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Dto.UsuarioCreateOperator()) dto: Dto.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  @Operacao(Dto.UsuarioUpdateOperator())
  async usuarioUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Dto.UsuarioUpdateOperator()) dto: Dto.IUsuarioUpdateDto) {
    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Dto.UsuarioDeleteOperator())
  async usuarioDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Dto.UsuarioDeleteOperator())
    dto: Dto.IUsuarioDeleteOneByIdInputDto,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, dto);
  }
}
