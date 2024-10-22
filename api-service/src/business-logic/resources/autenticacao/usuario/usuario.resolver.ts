import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
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
    @CombinedInput() dto: LadesaTypings.UsuarioListCombinedInput,
  ) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }
  //
  @PocOperation(PocTokens.UsuarioFindOneByID)
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
  @PocOperation(PocTokens.UsuarioCreate)
  async usuarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateCombinedInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }
  @PocOperation(PocTokens.UsuarioUpdateOneByID)
  async usuarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }
  @PocOperation(PocTokens.UsuarioDeleteOneByID)
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
