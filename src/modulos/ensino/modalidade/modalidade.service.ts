import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Spec from '@sisgea/spec';
import { map, pick } from 'lodash';
import { busca, getPaginatedResultDto } from '../../../busca';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { ModalidadeEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { paginateConfig } from '../../../legacy/utils';

// ============================================================================

const aliasModalidade = 'modalidade';

// ============================================================================

@Injectable()
export class ModalidadeService {
  constructor(private databaseContext: DatabaseContextService) {}

  get modalidadeRepository() {
    return this.databaseContext.modalidadeRepository;
  }

  //

  async modalidadeFindAll(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IPaginatedInputDto | null = null, selection?: string[]): Promise<Spec.IModalidadeFindAllResultDto> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('modalidade:find', qb, aliasModalidade, null);

    // =========================================================

    const paginated = await busca('#/', dto, qb, {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'slug',
        'dateCreated',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'slug',
        'dateCreated',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'slug',
        //
      ],
      defaultSortBy: [
        ['nome', 'ASC'],
        ['dateCreated', 'ASC'],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.MODALIDADE, qb, aliasModalidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async modalidadeFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: LadesaTypings.ModalidadeFindOneInput, selection?: string[]): Promise<LadesaTypings.ModalidadeFindOneResult | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('modalidade:find', qb, aliasModalidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.MODALIDADE, qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: LadesaTypings.ModalidadeFindOneInput, selection?: string[]) {
    const modalidade = await this.modalidadeFindById(contextoDeAcesso, dto, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeFindByIdSimple(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.ModalidadeFindOneInput['id'], selection?: string[]): Promise<LadesaTypings.ModalidadeFindOneResult | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('modalidade:find', qb, aliasModalidade, null);

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    AppResourceView(AppResource.MODALIDADE, qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: LadesaTypings.ModalidadeFindOneInput['id'], selection?: string[]) {
    const modalidade = await this.modalidadeFindByIdSimple(contextoDeAcesso, id, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  //

  async modalidadeCreate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IModalidadeInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('modalidade:create', { dto });

    // =========================================================

    const dtoModalidade = pick(dto, ['nome', 'slug']);

    const modalidade = this.modalidadeRepository.create();

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(contextoDeAcesso, { id: modalidade.id });
  }

  async modalidadeUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IModalidadeUpdateDto) {
    // =========================================================

    const currentModalidade = await this.modalidadeFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    // =========================================================

    await contextoDeAcesso.ensurePermission('modalidade:update', { dto }, dto.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    const dtoModalidade = pick(dto, ['nome', 'slug']);

    const modalidade = {
      id: currentModalidade.id,
    } as ModalidadeEntity;

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(contextoDeAcesso, { id: modalidade.id });
  }

  //

  async modalidadeDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IModalidadeDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('modalidade:delete', { dto }, dto.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    // =========================================================

    const modalidade = await this.modalidadeFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (modalidade) {
      await this.modalidadeRepository
        .createQueryBuilder(aliasModalidade)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :modalidadeId', { modalidadeId: modalidade.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
