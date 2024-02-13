import { Injectable, NotFoundException } from '@nestjs/common';
import { get, pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { ICampusFindOneByIdInputDto } from '../../(dtos)';
import {
  ICampusDeleteOneByIdInputDto,
  ICampusFindOneResultDto,
  ICampusInputDto,
  ICampusUpdateDto,
  IRequestContext,
} from '../../../../domain';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';
import { CampusEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { EnderecoService } from '../endereco/endereco.service';

@Injectable()
export class CampusService {
  constructor(
    private databaseContext: DatabaseContext,
    private enderecoService: EnderecoService,
  ) {}

  get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  //

  static campusSelectFindOne(
    qb: SelectQueryBuilder<any>,
    loadEndereco = true,
    loadCidade = true,
    loadEstado = true,
  ) {
    qb.addSelect([
      'campus.id',
      'campus.nomeFantasia',
      'campus.razaoSocial',
      'campus.nomeFantasia',
      'campus.apelido',
      'campus.cnpj',
    ]);

    if (loadEndereco) {
      qb.innerJoin('campus.endereco', 'endereco');
      EnderecoService.enderecoSelectFindOne(qb, loadCidade, loadEstado);
    }
  }

  //

  async campusFindAll(
    requestContext: IRequestContext,
  ): Promise<ICampusFindOneResultDto[]> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder('campus');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'campus');

    // =========================================================

    qb.select([]);
    CampusService.campusSelectFindOne(qb, true, true, true);

    qb.orderBy('campus.dateCreated', 'ASC');

    const campi = await qb.getMany();

    // =========================================================

    return campi;
  }

  async campusFindById(
    requestContext: IRequestContext,
    dto: ICampusFindOneByIdInputDto,
  ): Promise<ICampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder('campus');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'campus');

    // =========================================================

    qb.andWhere('campus.id = :id', { id: dto.id });

    // =========================================================

    qb.select([]);
    CampusService.campusSelectFindOne(qb, true, true, true);
    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdStrict(
    requestContext: IRequestContext,
    dto: ICampusFindOneByIdInputDto,
  ) {
    const campus = await this.campusFindById(requestContext, dto);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  //

  async campusCreate(requestContext: IRequestContext, dto: ICampusInputDto) {
    await requestContext.authz.ensurePermission('create', 'campus', { dto });

    const dtoCampus = pick(dto, [
      'nomeFantasia',
      'razaoSocial',
      'apelido',
      'cnpj',
    ]);

    const campus = this.campusRepository.create();

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(
      null,
      dto.endereco,
    );

    this.campusRepository.merge(campus, {
      endereco: {
        id: endereco.id,
      },
    });

    await this.campusRepository.save(campus);

    return this.campusFindByIdStrict(requestContext, { id: campus.id });
  }

  async campusUpdate(requestContext: IRequestContext, dto: ICampusUpdateDto) {
    const currentCampus = await this.campusFindByIdStrict(requestContext, {
      id: dto.id,
    });

    await requestContext.authz.ensurePermission('update', 'campus', { dto });

    const dtoCampus = pick(dto, [
      'nomeFantasia',
      'razaoSocial',
      'apelido',
      'cnpj',
    ]);

    const campus = <CampusEntity>{
      id: currentCampus.id,
    };

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    const dtoEndereco = get(dto, 'endereco');

    if (dtoEndereco) {
      const endereco =
        await this.enderecoService.internalEnderecoCreateOrUpdate(
          currentCampus.endereco.id,
          dtoEndereco,
        );

      this.campusRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });
    }

    await this.campusRepository.save(campus);

    return this.campusFindByIdStrict(requestContext, { id: campus.id });
  }

  //

  async campusDeleteOneById(
    requestContext: IRequestContext,
    dto: ICampusDeleteOneByIdInputDto,
  ) {
    const campus = await this.campusFindByIdStrict(requestContext, dto);

    await requestContext.authz.ensurePermission('delete', 'campus', { dto });

    if (campus) {
      await this.campusRepository
        .createQueryBuilder('campus')
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :campusId', { campusId: campus.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    return true;
  }
}
