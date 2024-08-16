import { AccessContext } from '@/access-context';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterOperator } from 'nestjs-paginate';
import { NotBrackets } from 'typeorm';
import { DatabaseContextService } from '../../../adapters/adapter-database';
import { UsuarioEntity } from '../../../adapters/adapter-database/typeorm/entities';
import { QbEfficientLoad } from '../../../app-standards/ladesa-spec/QbEfficientLoad';
import { LadesaSearch } from '../../../app-standards/ladesa-spec/search/search-strategies';
import { paginateConfig } from '../../../fixtures';
import { CampusService } from '../../ambientes/campus/campus.service';
import { UsuarioService } from '../usuario/usuario.service';

// ============================================================================

const aliasVinculo = 'vinculo';

// ============================================================================

@Injectable()
export class VinculoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get vinculoRepository() {
    return this.databaseContext.vinculoRepository;
  }

  //

  async vinculoGetAllActive(accessContext: AccessContext | null, usuarioId: UsuarioEntity['id']) {
    const qb = this.vinculoRepository.createQueryBuilder('vinculo');

    qb.innerJoin('vinculo.usuario', 'usuario');
    qb.where('usuario.id = :usuarioId', { usuarioId });
    qb.andWhere('vinculo.ativo = :ativo', { ativo: true });

    if (accessContext) {
      await accessContext.aplicarFiltro('vinculo:find', qb, aliasVinculo, null);
    }

    QbEfficientLoad(LadesaTypings.Tokens.Vinculo.Views.FindOneResult, qb, 'vinculo');

    const vinculos = await qb.getMany();

    return vinculos;
  }

  async vinculoFindAll(accessContext: AccessContext, dto: LadesaTypings.VinculoListCombinedInput | null = null, selection?: string[] | boolean) {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    QbEfficientLoad(LadesaTypings.Tokens.Vinculo.Views.FindOneResult, qb, aliasVinculo, selection);

    await accessContext.aplicarFiltro('vinculo:find', qb, aliasVinculo, null);

    const paginated = LadesaSearch('#/', dto, qb, {
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

    return paginated;
  }

  async vinculoFindById(accessContext: AccessContext, dto: LadesaTypings.VinculoFindOneInput, selection?: string[] | boolean): Promise<LadesaTypings.VinculoFindOneResult | null> {
    // =========================================================

    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    // =========================================================

    await accessContext.aplicarFiltro('vinculo:find', qb, aliasVinculo, null);

    // =========================================================

    qb.andWhere(`${aliasVinculo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.Vinculo.Views.FindOneResult, qb, aliasVinculo, selection);

    // =========================================================

    const vinculo = await qb.getOne();

    // =========================================================

    return vinculo;
  }

  async vinculoFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.VinculoFindOneInput, selection?: string[] | boolean) {
    const vinculo = await this.vinculoFindById(accessContext, dto, selection);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async vinculoSetVinculos(accessContext: AccessContext, dto: LadesaTypings.VinculoUpdateCombinedInput) {
    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, dto.body.usuario.id);

    const vinculosParaManter = new Set();

    for (const cargo of dto.body.cargos) {
      const vinculoAtualAtivo = await this.vinculoRepository
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

      const vinculo = this.vinculoRepository.create();

      this.vinculoRepository.merge(vinculo, {
        ativo: true,
        cargo: cargo,
        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.vinculoRepository.save(vinculo);

      vinculosParaManter.add(vinculo.id);
    }

    // DESATIVAR OUTROS VÍNCULOS
    await this.vinculoRepository
      .createQueryBuilder('usuario_vinculo_campus')
      .update()
      .set({
        ativo: false,
      })
      .where('ativo = :isActive', { isActive: true })
      .andWhere(new NotBrackets((qb) => qb.whereInIds([...vinculosParaManter])))
      .execute();

    return this.vinculoFindAll(accessContext, <any>{
      queries: {
        'filter.ativo': ['true'],
        'filter.usuario.id': [`${usuario.id}`],
        'filter.campus.id': [`${campus.id}`],
      },
    });
  }
}
