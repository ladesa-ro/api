import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsuarioService } from "./usuario.service";

@Controller("/usuarios")
@ApiTags("Usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.UsuarioList)
  async usuarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioListCombinedInput,
  ): Promise<LadesaTypings.UsuarioListCombinedSuccessOutput["body"]> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.UsuarioFindOneByID)
  async usuarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.UsuarioCreate)
  async usuarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateCombinedInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.UsuarioUpdateOneByID)
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIDCombinedInput) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @PocOperation(PocTokens.UsuarioGetImagemCapa)
  async usuarioGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.params.id);
  }

  @Put("/:id/imagem/capa")
  @PocOperation(PocTokens.UsuarioSetImagemCapa)
  async usuarioImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Get("/:id/imagem/perfil")
  @PocOperation(PocTokens.UsuarioGetImagemPerfil)
  async usuarioGetImagemPerfil(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, dto.params.id);
  }

  @Put("/:id/imagem/perfil")
  @PocOperation(PocTokens.UsuarioSetImagemPerfil)
  async usuarioImagemPerfilSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.UsuarioDeleteOneByID)
  async usuarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
