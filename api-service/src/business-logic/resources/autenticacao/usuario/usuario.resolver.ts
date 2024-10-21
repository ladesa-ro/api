import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { UsuarioService } from "./usuario.service";

@Resolver()
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}
  //
  @PocOperation(PocTokens.UsuarioList)
  async usuarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.UsuarioListOperationInput,
  ) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.UsuarioFindOneById)
  async usuarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.UsuarioFindOneByIdOperationInput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @PocOperation(PocTokens.UsuarioCreate)
  async usuarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.UsuarioCreateOperationInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.UsuarioUpdateOneById)
  async usuarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.UsuarioUpdateByIdOperationInput,
  ) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.UsuarioDeleteOneById)
  async usuarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: PocTypings.UsuarioDeleteByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}
