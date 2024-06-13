import LadesaTypings from '@ladesa-ro/especificacao';
import { Resolver } from '@nestjs/graphql';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { CampusService } from './campus.service';

@Resolver()
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}
  //
  @Operation(LadesaTypings.Tokens.Campus.Operations.List)
  async campusFindAll(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CampusListCombinedInput,
  ) {
    return this.campusService.campusFindAll(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Campus.Operations.FindById)
  async campusFindOneById(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CampusFindOneInput,
  ) {
    return this.campusService.campusFindByIdStrict(contextoDeAcesso, dto);
  }
  //
  @Operation(LadesaTypings.Tokens.Campus.Operations.Create)
  async campusCreate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CampusCreateCombinedInput,
  ) {
    return this.campusService.campusCreate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Campus.Operations.Create)
  async campusUpdate(
    //
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.CampusUpdateByIDCombinedInput,
  ) {
    return this.campusService.campusUpdate(contextoDeAcesso, dto);
  }
  @Operation(LadesaTypings.Tokens.Campus.Operations.DeleteById)
  async campusDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput()
    dto: LadesaTypings.CampusFindOneInput,
  ) {
    return this.campusService.campusDeleteOneById(contextoDeAcesso, dto);
  }
}
