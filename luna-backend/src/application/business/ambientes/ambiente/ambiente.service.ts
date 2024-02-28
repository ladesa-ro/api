import { Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { AmbienteEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/ambiente.entity';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { BlocoService, IBlocoQueryBuilderViewOptions } from '../bloco/bloco.service';

// ============================================================================

const aliasAmbiente = 'ambiente';

// ============================================================================

export type IAmbienteQueryBuilderViewOptions = {
  loadBloco?: IQueryBuilderViewOptionsLoad<IBlocoQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class AmbienteService {
  constructor(
    private blocoService: BlocoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get ambienteRepository() {
    return this.databaseContext.ambienteRepository;
  }

  //

  static AmbienteQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IAmbienteQueryBuilderViewOptions = {}) {
    const loadBloco = getQueryBuilderViewLoadMeta(options.loadBloco, true, `${alias}_bloco`);

    qb.addSelect([
      //
      `${alias}.id`,
      //
      `${alias}.nome`,
      `${alias}.descricao`,
      `${alias}.codigo`,
      `${alias}.capacidade`,
      `${alias}.tipo`,
    ]);

    if (loadBloco) {
      qb.innerJoin(`${alias}.bloco`, `${loadBloco.alias}`);
      BlocoService.BlocoQueryBuilderView(loadBloco.alias, qb, loadBloco.options);
    }
  }

  //

  async ambienteFindAll(clientAccess: IClientAccess): Promise<Dtos.IAmbienteFindOneResultDto[]> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await clientAccess.applyFilter('ambiente:find', qb, aliasAmbiente, null);

    // =========================================================

    qb.select([]);

    AmbienteService.AmbienteQueryBuilderView(aliasAmbiente, qb, {
      loadBloco: true,
    });

    // =========================================================

    qb.orderBy(`${aliasAmbiente}.dateCreated`, 'ASC');

    // =========================================================

    const ambientes = await qb.getMany();

    // =========================================================

    return ambientes;
  }

  async ambienteFindById(clientAccess: IClientAccess, dto: Dtos.IAmbienteFindOneByIdInputDto): Promise<Dtos.IAmbienteFindOneResultDto | null> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await clientAccess.applyFilter('ambiente:find', qb, aliasAmbiente, null);

    // =========================================================

    qb.andWhere(`${aliasAmbiente}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    AmbienteService.AmbienteQueryBuilderView(aliasAmbiente, qb, {
      loadBloco: true,
    });

    // =========================================================

    const ambiente = await qb.getOne();

    // =========================================================

    return ambiente;
  }

  async ambienteFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IAmbienteFindOneByIdInputDto) {
    const ambiente = await this.ambienteFindById(clientAccess, dto);

    if (!ambiente) {
      throw new NotFoundException();
    }

    return ambiente;
  }

  //

  async ambienteCreate(clientAccess: IClientAccess, dto: Dtos.IAmbienteInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('ambiente:create', { dto });

    // =========================================================

    const dtoAmbiente = pick(dto, ['nome', 'descricao', 'codigo', 'capacidade', 'tipo']);

    const ambiente = this.ambienteRepository.create();

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(clientAccess, dto.bloco.id);

    this.ambienteRepository.merge(ambiente, {
      bloco: {
        id: bloco.id,
      },
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(clientAccess, { id: ambiente.id });
  }

  async ambienteUpdate(clientAccess: IClientAccess, dto: Dtos.IAmbienteUpdateDto) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('ambiente:update', { dto }, this.ambienteRepository.createQueryBuilder(aliasAmbiente), dto.id);

    const dtoAmbiente = pick(dto, ['nome', 'descricao', 'codigo', 'capacidade', 'tipo']);

    const ambiente = <AmbienteEntity>{
      id: currentAmbiente.id,
    };

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(clientAccess, { id: ambiente.id });
  }

  //

  async ambienteDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IAmbienteDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('ambiente:delete', { dto }, this.ambienteRepository.createQueryBuilder(aliasAmbiente), dto.id);

    // =========================================================

    const bloco = await this.ambienteFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (bloco) {
      await this.ambienteRepository
        .createQueryBuilder(aliasAmbiente)
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
