import { Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { BlocoEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/bloco.entity';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { CampusService, ICampusQueryBuilderViewOptions } from '../campus/campus.service';

// ============================================================================

const aliasBloco = 'bloco';

// ============================================================================

export type IBlocoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class BlocoService {
  constructor(
    private campusService: CampusService,
    private databaseContext: DatabaseContextService,
  ) {}

  get blocoRepository() {
    return this.databaseContext.blocoRepository;
  }

  //

  static BlocoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IBlocoQueryBuilderViewOptions = {}) {
    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.codigo`,
    ]);

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }
  }

  //

  async blocoFindAll(clientAccess: IClientAccess): Promise<Dtos.IBlocoFindOneResultDto[]> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await clientAccess.applyFilter('bloco:find', qb, aliasBloco, null);

    // =========================================================

    qb.select([]);

    BlocoService.BlocoQueryBuilderView(aliasBloco, qb, {
      loadCampus: true,
    });

    // =========================================================

    qb.orderBy(`${aliasBloco}.dateCreated`, 'ASC');

    // =========================================================

    const blocos = await qb.getMany();

    // =========================================================

    return blocos;
  }

  async blocoFindById(clientAccess: IClientAccess, dto: Dtos.IBlocoFindOneByIdInputDto): Promise<Dtos.IBlocoFindOneResultDto | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await clientAccess.applyFilter('bloco:find', qb, aliasBloco, null);

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    BlocoService.BlocoQueryBuilderView(aliasBloco, qb, {
      loadCampus: true,
    });

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IBlocoFindOneByIdInputDto) {
    const bloco = await this.blocoFindById(clientAccess, dto);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.IBlocoFindOneByIdInputDto['id'],
    options?: IBlocoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IBlocoFindOneResultDto | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await clientAccess.applyFilter('bloco:find', qb, aliasBloco, null);

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    BlocoService.BlocoQueryBuilderView(aliasBloco, qb, {
      loadCampus: false,
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.IBlocoFindOneByIdInputDto['id'], options?: IBlocoQueryBuilderViewOptions, selection?: string[]) {
    const bloco = await this.blocoFindByIdSimple(clientAccess, id, options, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  //

  async blocoCreate(clientAccess: IClientAccess, dto: Dtos.IBlocoInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('bloco:create', { dto });

    // =========================================================

    const dtoBloco = pick(dto, ['nome', 'codigo']);

    const bloco = this.blocoRepository.create();

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(clientAccess, dto.campus.id);

    this.blocoRepository.merge(bloco, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(clientAccess, { id: bloco.id });
  }

  async blocoUpdate(clientAccess: IClientAccess, dto: Dtos.IBlocoUpdateDto) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('bloco:update', { dto }, this.blocoRepository.createQueryBuilder(aliasBloco), dto.id);

    const dtoBloco = pick(dto, ['nome', 'codigo']);

    const bloco = <BlocoEntity>{
      id: currentBloco.id,
    };

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(clientAccess, { id: bloco.id });
  }

  //

  async blocoDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IBlocoDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('bloco:delete', { dto }, this.blocoRepository.createQueryBuilder(aliasBloco), dto.id);

    // =========================================================

    const bloco = await this.blocoFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (bloco) {
      await this.blocoRepository
        .createQueryBuilder(aliasBloco)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :blocoId', { blocoId: bloco.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
