import { Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { IEnderecoFindOneByIdInputDto, IEnderecoFindOneResultDto, IEnderecoInputDto, IEnderecoModel } from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { parsePayloadYup } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { CidadeService, ICidadeQueryBuilderViewOptions } from '../cidade/cidade.service';
import { EnderecoInputDtoValidationContract } from './dtos';

// ============================================================================

const aliasEndereco = 'endereco';

// ============================================================================

export type IEnderecoQueryBuilderViewOptions = {
  loadCidade?: IQueryBuilderViewOptionsLoad<ICidadeQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContextService) {}

  //

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  //

  static EnderecoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IEnderecoQueryBuilderViewOptions = {}) {
    const loadCidade = getQueryBuilderViewLoadMeta(options.loadCidade, true, `${alias}_cidade`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.cep`,
      `${alias}.logradouro`,
      `${alias}.numero`,
      `${alias}.bairro`,
      `${alias}.complemento`,
      `${alias}.pontoReferencia`,
    ]);

    if (loadCidade) {
      qb.leftJoin(`${alias}.cidade`, `${loadCidade.alias}`);
      CidadeService.CidadeQueryBuilderView(loadCidade.alias, qb, loadCidade.options);
    }
  }

  //

  async internalFindOneById(id: IEnderecoModel['id']) {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: id,
      },
    });

    return endereco;
  }

  async internalFindOneByIdStrict(id: IEnderecoModel['id']) {
    const endereco = await this.internalFindOneById(id);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: IEnderecoModel['id'] | null, payload: IEnderecoInputDto) {
    const dto = await parsePayloadYup(EnderecoInputDtoValidationContract(), payload);

    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = <IEnderecoInputDto>{
      ...pick(dto, ['cep', 'logradouro', 'numero', 'bairro', 'complemento', 'pontoReferencia']),

      cidade: {
        id: dto.cidade.id,
      },
    };

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  //

  async findById(clientAccess: IClientAccess, dto: IEnderecoFindOneByIdInputDto): Promise<IEnderecoFindOneResultDto | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    // =========================================================

    await clientAccess.applyFilter('endereco:find', qb, aliasEndereco, {
      from: 'find-by-id',
      dto: dto,
    });

    // =========================================================

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    EnderecoService.EnderecoQueryBuilderView(aliasEndereco, qb, {
      loadCidade: {
        alias: `${aliasEndereco}_cidade`,
      },
    });

    // =========================================================

    const endereco = await qb.getOne();

    // =========================================================

    return endereco;
  }

  async findByIdStrict(requestContext: IClientAccess, dto: IEnderecoFindOneByIdInputDto) {
    const endereco = await this.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
