import { AccessContext, AccessContextHttp } from '@/access-context';
import { CombinedInput, Operation } from '@/app-standards';
import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CampusService } from './campus.service';

@ApiTags('Campi')
@Controller('/campi')
export class CampusController {
  constructor(private campusService: CampusService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Campus.Operations.List)
  async campusFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusListCombinedInput,
  ): Promise<LadesaTypings.CampusListCombinedSuccessOutput['body']> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Campus.Operations.FindById)
  async campusFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.campusService.campusFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Campus.Operations.Create)
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusCreateCombinedInput,
  ) {
    return this.campusService.campusCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Campus.Operations.UpdateById)
  async campusUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CampusUpdateByIDCombinedInput,
  ) {
    return this.campusService.campusUpdate(accessContext, dto);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Campus.Operations.DeleteById)
  async campusDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindByIDCombinedInput,
  ) {
    return this.campusService.campusDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
