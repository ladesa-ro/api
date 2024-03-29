import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
import { GqlDtoInput } from '../../../../infrastructure/api-documentate/GqlDtoInput';
import { ModalidadeOperations } from './dtos';
import { ModalidadeDto } from './dtos/modalidade.dto';
import { ModalidadeService } from './modalidade.service';

@Resolver(() => ModalidadeDto)
export class ModalidadeResolver {
  constructor(
    //
    private modalidadeService: ModalidadeService,
  ) {}

  //

  @DtoOperationGqlQuery(ModalidadeOperations.MODALIDADE_FIND_ALL)
  async modalidadeFindAll(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(ModalidadeOperations.MODALIDADE_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.modalidadeService.modalidadeFindAll(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlQuery(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
  async modalidadeFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
    dto: Dto.IModalidadeFindOneByIdInputDto,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, dto);
  }

  //

  @DtoOperationGqlMutation(ModalidadeOperations.MODALIDADE_CREATE)
  async modalidadeCreate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(ModalidadeOperations.MODALIDADE_CREATE) dto: Dto.IModalidadeInputDto) {
    return this.modalidadeService.modalidadeCreate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(ModalidadeOperations.MODALIDADE_UPDATE)
  async modalidadeUpdate(@ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso, @GqlDtoInput(ModalidadeOperations.MODALIDADE_UPDATE) dto: Dto.IModalidadeUpdateDto) {
    return this.modalidadeService.modalidadeUpdate(contextoDeAcesso, dto);
  }

  @DtoOperationGqlMutation(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID)
  async modalidadeDeleteOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID)
    dto: Dto.IModalidadeDeleteOneByIdInputDto,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(contextoDeAcesso, dto);
  }
}
