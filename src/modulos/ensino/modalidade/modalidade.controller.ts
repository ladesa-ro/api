import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { CombinedInput, Operation } from '../../../fixtures';
import { ModalidadeService } from './modalidade.service';

@ApiTags('Modalidades')
@Controller('/modalidades')
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.List)
  async modalidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeListCombinedInput,
  ): Promise<LadesaTypings.ModalidadeListCombinedSuccessOutput['body']> {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.FindById)
  async modalidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.Create)
  async modalidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateCombinedInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.Create)
  async modalidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Modalidade.Operations.DeleteById)
  async modalidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeDeleteByIDCombinedInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
