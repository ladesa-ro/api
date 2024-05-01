import { Info, Resolver } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import type { GraphQLResolveInfo } from 'graphql';
import getFieldNames from 'graphql-list-fields';
import type { IContextoDeAcesso } from '../../../../domain';
import { ContextoDeAcessoGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infraestrutura';
import { GqlDtoInput } from '../../../../infraestrutura/api-documentate/GqlDtoInput';
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
  async modalidadeFindAll(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(ModalidadeOperations.MODALIDADE_FIND_ALL) dto: Dto.ISearchInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info)
      .filter((i) => i.startsWith('data.'))
      .map((i) => i.slice(i.indexOf('.') + 1));

    return this.modalidadeService.modalidadeFindAll(contextoDeAcesso, dto, selection);
  }

  //

  @DtoOperationGqlQuery(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
  async modalidadeFindOneById(
    @ContextoDeAcessoGraphQl() contextoDeAcesso: IContextoDeAcesso,
    @GqlDtoInput(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
    dto: Dto.IModalidadeFindOneByIdInputDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const selection = getFieldNames(<any>info);
    return this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, dto, ['id', ...selection]);
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
