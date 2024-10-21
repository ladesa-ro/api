import { CombinedInput } from "@/business-logic/standards";
import { PocOperation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens as PocTokens } from "@ladesa-ro/especificacao-latest";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModalidadeService } from "./modalidade.service";

@ApiTags("Modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get("/")
  @PocOperation(PocTokens.ModalidadeList)
  async modalidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeListCombinedInput,
  ): Promise<LadesaTypings.ModalidadeListCombinedSuccessOutput["body"]> {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @PocOperation(PocTokens.ModalidadeFindOneByID)
  async modalidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @PocOperation(PocTokens.ModalidadeCreate)
  async modalidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateCombinedInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @PocOperation(PocTokens.ModalidadeUpdateOneByID)
  async modalidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @PocOperation(PocTokens.ModalidadeDeleteOneByID)
  async modalidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeDeleteByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
