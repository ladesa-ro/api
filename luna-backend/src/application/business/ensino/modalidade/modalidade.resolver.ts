import { Resolver } from '@nestjs/graphql';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessGraphQl, DtoOperationGqlMutation, DtoOperationGqlQuery } from '../../../../infrastructure';
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
  async modalidadeFindAll(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(ModalidadeOperations.MODALIDADE_FIND_ALL) dto: Dto.ISearchInputDto) {
    return this.modalidadeService.modalidadeFindAll(clientAccess, dto);
  }

  //

  @DtoOperationGqlQuery(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
  async modalidadeFindOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
    dto: Dto.IModalidadeFindOneByIdInputDto,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(clientAccess, dto);
  }

  //

  @DtoOperationGqlMutation(ModalidadeOperations.MODALIDADE_CREATE)
  async modalidadeCreate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(ModalidadeOperations.MODALIDADE_CREATE) dto: Dto.IModalidadeInputDto) {
    return this.modalidadeService.modalidadeCreate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(ModalidadeOperations.MODALIDADE_UPDATE)
  async modalidadeUpdate(@ClientAccessGraphQl() clientAccess: IClientAccess, @GqlDtoInput(ModalidadeOperations.MODALIDADE_UPDATE) dto: Dto.IModalidadeUpdateDto) {
    return this.modalidadeService.modalidadeUpdate(clientAccess, dto);
  }

  @DtoOperationGqlMutation(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID)
  async modalidadeDeleteOneById(
    @ClientAccessGraphQl() clientAccess: IClientAccess,
    @GqlDtoInput(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID)
    dto: Dto.IModalidadeDeleteOneByIdInputDto,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(clientAccess, dto);
  }
}
