import { type AccessContext, AccessContextHttp } from "@/access-context";
import { CombinedInput, Operation } from "@/business-logic/standards";
import LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AulaService } from "./aula.service";

@ApiTags("Aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  //

  @Get("/")
  @Operation(LadesaTypings.Tokens.Aula.Operations.List)
  async aulaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaListCombinedInput,
  ): Promise<LadesaTypings.AulaListCombinedSuccessOutput["body"]> {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(LadesaTypings.Tokens.Aula.Operations.FindById)
  async aulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaFindByIDCombinedInput,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(LadesaTypings.Tokens.Aula.Operations.Create)
  async aulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaCreateCombinedInput,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(LadesaTypings.Tokens.Aula.Operations.UpdateById)
  async aulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaUpdateByIDCombinedInput,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(LadesaTypings.Tokens.Aula.Operations.DeleteById)
  async aulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AulaDeleteByIDCombinedInput,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
