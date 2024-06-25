import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { CombinedInput, Operation } from '../../../fixtures';
import { EtapaService } from './etapa.service';

@ApiTags('Etapas')
@Controller('/etapas')
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get('/')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.List)
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @CombinedInput() dto: LadesaTypings.EtapaListCombinedInput): Promise<LadesaTypings.EtapaListCombinedSuccessOutput['body']> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.FindById)
  async etapaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaFindByIDCombinedInput,
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaCreateCombinedInput,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.Create)
  async etapaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaUpdateByIDCombinedInput,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Etapa.Operations.DeleteById)
  async etapaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EtapaDeleteByIDCombinedInput,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
