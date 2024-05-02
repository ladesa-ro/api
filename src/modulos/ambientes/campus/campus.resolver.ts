import { Resolver } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoGraphQl, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { Operacao } from '../../../especificacao';
import { GqlDtoInput } from '../../../legacy';
import { CampusDto } from './campus.dtos';
import { CampusService } from './campus.service';

@Resolver(() => CampusDto)
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}

  //

  @Operacao(Spec.CampusFindAllOperator())
  async campusFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.CampusFindAllOperator()) dto: Spec.ISearchInputDto) {
    return this.campusService.campusFindAll(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CampusFindOneByIdOperator())
  async campusFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.CampusFindOneByIdOperator())
    dto: Spec.ICampusFindOneByIdInputDto,
  ) {
    return this.campusService.campusFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @Operacao(Spec.CampusCreateOperator())
  async campusCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.CampusCreateOperator()) dto: Spec.ICampusInputDto) {
    return this.campusService.campusCreate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.CampusUpdateOperator())
  async campusUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(Spec.CampusUpdateOperator()) dto: Spec.ICampusUpdateDto) {
    return this.campusService.campusUpdate(contextoDeAcesso, dto);
  }

  @Operacao(Spec.CampusDeleteOperator())
  async campusDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(Spec.CampusDeleteOperator())
    dto: Spec.ICampusDeleteOneByIdInputDto,
  ) {
    return this.campusService.campusDeleteOneById(contextoDeAcesso, dto);
  }
}
