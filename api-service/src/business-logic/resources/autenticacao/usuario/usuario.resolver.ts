import { type AccessContext, AccessContextGraphQl } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { UsuarioService } from "./usuario.service";

@Resolver()
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Usuario.Operations.List)
  async usuarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioListCombinedInput,
  ) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Usuario.Operations.FindById)
  async usuarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateCombinedInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Usuario.Operations.UpdateById)
  async usuarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }
  @Operation(LadesaTypings.Tokens.Usuario.Operations.DeleteById)
  async usuarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
