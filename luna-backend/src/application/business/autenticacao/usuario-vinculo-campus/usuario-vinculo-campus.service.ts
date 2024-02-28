import { Injectable } from '@nestjs/common';
import { CampusService, ICampusQueryBuilderViewOptions } from 'application/business/ambientes/campus/campus.service';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from 'application/utils/QueryBuilderViewOptionsLoad';
import { DatabaseContextService } from 'infrastructure';
import { paginateConfig } from 'infrastructure/utils/paginateConfig';
import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { NotBrackets, SelectQueryBuilder } from 'typeorm';
import * as Dto from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { UsuarioService } from '../usuario/usuario.service';

// ============================================================================

const aliasUsuarioVinculoCampus = 'vinculo';

// ============================================================================

export type IUsuarioVinculoCampusQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadUsuario?: IQueryBuilderViewOptionsLoad<unknown>;
};

// ============================================================================

@Injectable()
export class UsuarioVinculoCampusService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get usuarioVinculoCampusRepository() {
    return this.databaseContext.usuarioVinculoCampusRepository;
  }

  //

  static UsuarioVinculoCampusQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IUsuarioVinculoCampusQueryBuilderViewOptions = {}) {
    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);
    const loadUsuario = getQueryBuilderViewLoadMeta(options.loadUsuario, true, `${alias}_usuario`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.ativo`,
      `${alias}.cargo`,
    ]);

    if (loadUsuario) {
      qb.innerJoin(`${alias}.usuario`, `${loadUsuario.alias}`);
      UsuarioService.UsuarioQueryBuilderView(loadUsuario.alias, qb);
    }

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }
  }

  //

  async vinculoFindAll(clientAccess: IClientAccess, query: PaginateQuery = { path: '' }) {
    const qb = this.usuarioVinculoCampusRepository.createQueryBuilder(aliasUsuarioVinculoCampus);

    UsuarioVinculoCampusService.UsuarioVinculoCampusQueryBuilderView(aliasUsuarioVinculoCampus, qb);

    await clientAccess.applyFilter('vinculo:find', qb, aliasUsuarioVinculoCampus, null);

    return paginate(query, qb, {
      ...paginateConfig,

      relations: {
        campus: true,
        usuario: true,
      },

      select: [
        'id',
        'ativo',
        'cargo',
        'campus.id',
        'campus.nomeFantasia',
        'campus.razaoSocial',
        'campus.apelido',
        'campus.cnpj',
        'usuario.id',
        'usuario.matriculaSiape',
        'usuario.email',
        'dateCreated',
      ],

      searchableColumns: ['cargo'],

      filterableColumns: {
        ativo: [FilterOperator.EQ],
        cargo: [FilterOperator.EQ],
        'campus.id': [FilterOperator.EQ],
        'usuario.id': [FilterOperator.EQ],
      },
    });
  }

  async vinculoSetVinculos(clientAccess: IClientAccess, dto: Dto.IUsuarioVinculoCampusSetVinculosInputDto) {
    const campus = await this.campusService.campusFindByIdSimpleStrict(clientAccess, dto.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(clientAccess, dto.usuario.id);

    const vinculosParaManter = new Set();

    for (const cargo of dto.cargos) {
      const vinculoAtualAtivo = await this.usuarioVinculoCampusRepository
        .createQueryBuilder('vinculo')
        .innerJoin('vinculo.campus', 'campus')
        .innerJoin('vinculo.usuario', 'usuario')
        .andWhere('vinculo.ativo = TRUE')
        .andWhere('vinculo.dateDeleted IS NULL')
        .andWhere('campus.id = :campusId', { campusId: campus.id })
        .andWhere('usuario.id = :usuarioId', { usuarioId: usuario.id })
        .andWhere('vinculo.cargo = :cargo', { cargo: cargo })
        .getOne();

      if (vinculoAtualAtivo) {
        vinculosParaManter.add(vinculoAtualAtivo.id);
        continue;
      }

      const vinculo = this.usuarioVinculoCampusRepository.create();

      this.usuarioVinculoCampusRepository.merge(vinculo, {
        ativo: true,
        cargo: cargo,
        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.usuarioVinculoCampusRepository.save(vinculo);

      vinculosParaManter.add(vinculo.id);
    }

    // DESATIVAR OUTROS VÍNCULOS
    await this.usuarioVinculoCampusRepository
      .createQueryBuilder('usuario_vinculo_campus')
      .update()
      .set({
        ativo: false,
      })
      .where('ativo = :isActive', { isActive: true })
      .andWhere(new NotBrackets((qb) => qb.whereInIds([...vinculosParaManter])))
      .execute();

    return this.vinculoFindAll(clientAccess, {
      path: '/vinculos',
      filter: {
        ativo: 'true',
        'usuario.id': `${usuario.id}`,
        'campus.id': `${campus.id}`,
      },
    });
  }
}
