import { Injectable, NotFoundException } from '@nestjs/common';
import { get, pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { ICampusDeleteOneByIdInputDto, ICampusFindOneByIdInputDto, ICampusFindOneResultDto, ICampusInputDto, ICampusUpdateDto } from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { CampusEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { EnderecoService, IEnderecoQueryBuilderViewOptions } from '../endereco/endereco.service';

// ============================================================================

const aliasCampus = 'campus';

// ============================================================================

export type ICampusQueryBuilderViewOptions = {
  loadEndereco?: IQueryBuilderViewOptionsLoad<IEnderecoQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class CampusService {
  constructor(
    private enderecoService: EnderecoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  //

  static campusSelectFindOne(alias: string, qb: SelectQueryBuilder<any>, options: ICampusQueryBuilderViewOptions = {}) {
    const loadEndereco = getQueryBuilderViewLoadMeta(options.loadEndereco, true, `${alias}_endereco`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nomeFantasia`,
      `${alias}.razaoSocial`,
      `${alias}.nomeFantasia`,
      `${alias}.apelido`,
      `${alias}.cnpj`,
    ]);

    if (loadEndereco) {
      qb.innerJoin(`${alias}.endereco`, `${loadEndereco.alias}`);
      EnderecoService.EnderecoQueryBuilderView(loadEndereco.alias, qb, loadEndereco.options);
    }
  }

  //

  async campusFindAll(clientAccess: IClientAccess): Promise<ICampusFindOneResultDto[]> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await clientAccess.applyFilter('campus:find', qb, aliasCampus, null);

    // =========================================================

    qb.select([]);

    CampusService.campusSelectFindOne(aliasCampus, qb, {
      loadEndereco: true,
    });

    // =========================================================

    qb.orderBy(`${aliasCampus}.dateCreated`, 'ASC');

    // =========================================================

    const campi = await qb.getMany();

    // =========================================================

    return campi;
  }

  async campusFindById(clientAccess: IClientAccess, dto: ICampusFindOneByIdInputDto): Promise<ICampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await clientAccess.applyFilter('campus:find', qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    CampusService.campusSelectFindOne(aliasCampus, qb, {
      loadEndereco: true,
    });

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdStrict(clientAccess: IClientAccess, dto: ICampusFindOneByIdInputDto) {
    const campus = await this.campusFindById(clientAccess, dto);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  //

  async campusCreate(clientAccess: IClientAccess, dto: ICampusInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('campus:create', { dto });

    // =========================================================

    const dtoCampus = pick(dto, ['nomeFantasia', 'razaoSocial', 'apelido', 'cnpj']);

    const campus = this.campusRepository.create();

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    // =========================================================

    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);

    this.campusRepository.merge(campus, {
      endereco: {
        id: endereco.id,
      },
    });

    // =========================================================

    await this.campusRepository.save(campus);

    // =========================================================

    return this.campusFindByIdStrict(clientAccess, { id: campus.id });
  }

  async campusUpdate(clientAccess: IClientAccess, dto: ICampusUpdateDto) {
    // =========================================================

    const currentCampus = await this.campusFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('campus:update', { dto }, this.campusRepository.createQueryBuilder(aliasCampus), dto.id);

    const dtoCampus = pick(dto, ['nomeFantasia', 'razaoSocial', 'apelido', 'cnpj']);

    const campus = <CampusEntity>{
      id: currentCampus.id,
    };

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    // =========================================================

    const dtoEndereco = get(dto, 'endereco');

    if (dtoEndereco) {
      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(currentCampus.endereco.id, dtoEndereco);

      this.campusRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });
    }

    // =========================================================

    await this.campusRepository.save(campus);

    // =========================================================

    return this.campusFindByIdStrict(clientAccess, { id: campus.id });
  }

  //

  async campusDeleteOneById(clientAccess: IClientAccess, dto: ICampusDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('campus:delete', { dto }, this.campusRepository.createQueryBuilder(aliasCampus), dto.id);

    // =========================================================

    const campus = await this.campusFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (campus) {
      await this.campusRepository
        .createQueryBuilder(aliasCampus)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :campusId', { campusId: campus.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
