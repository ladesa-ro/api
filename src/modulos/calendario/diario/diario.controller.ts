import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { DiarioService } from './diario.service';

@ApiTags('Diarios')
@Controller('/diarios')
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Diario.Operations.List)
  async diarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioListCombinedInput,
  ): Promise<LadesaTypings.DiarioListCombinedSuccessOutput['body']> {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Diario.Operations.FindById)
  async diarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioFindByIDCombinedInput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioCreateCombinedInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Diario.Operations.Create)
  async diarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIDCombinedInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Diario.Operations.DeleteById)
  async diarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIDCombinedInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
