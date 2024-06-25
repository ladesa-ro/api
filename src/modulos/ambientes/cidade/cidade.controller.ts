import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { CombinedInput, Operation } from '../../../fixtures';
import { CidadeService } from './cidade.service';

@ApiTags('Cidades')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get('/')
  @Operation(LadesaTypings.Tokens.Cidade.Operations.List)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeListCombinedInput,
  ): Promise<LadesaTypings.CidadeListCombinedSuccessOutput['body']> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Cidade.Operations.FindById)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeFindByIDCombinedInput,
  ): Promise<LadesaTypings.CidadeFindOneResult> {
    return this.cidadeService.findByIdStrict(accessContext, { id: dto.params.id });
  }
}
