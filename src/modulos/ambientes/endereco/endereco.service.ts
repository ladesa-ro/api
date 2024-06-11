import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IEnderecoFindOneByIdInputDto, IEnderecoFindOneResultDto, IEnderecoInputDto, IEnderecoModel, parsePayloadYup } from '@sisgea/spec';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { QbEfficientLoad } from '../../../helpers/ladesa/QbEfficientLoad';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { EnderecoCreateDtoValidationContract } from './endereco.dtos';

// ============================================================================

const aliasEndereco = 'endereco';

// ============================================================================

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContextService) {}

  //

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  //

  static EnderecoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>) {
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

    qb.leftJoin(`${alias}.cidade`, `${alias}_cidade`);
    QbEfficientLoad(LadesaTypings.Tokens.Cidade.Entity, qb, `${alias}_cidade`);
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
    const dto = await parsePayloadYup(EnderecoCreateDtoValidationContract(), payload);

    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = {
      ...pick(dto, ['cep', 'logradouro', 'numero', 'bairro', 'complemento', 'pontoReferencia']),

      cidade: {
        id: dto.cidade.id,
      },
    } as IEnderecoInputDto;

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  //

  async findById(contextoDeAcesso: IContextoDeAcesso, dto: IEnderecoFindOneByIdInputDto): Promise<IEnderecoFindOneResultDto | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('endereco:find', qb, aliasEndereco, null);

    // =========================================================

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    EnderecoService.EnderecoQueryBuilderView(aliasEndereco, qb);

    // =========================================================

    const endereco = await qb.getOne();

    // =========================================================

    return endereco;
  }

  async findByIdStrict(requestContext: IContextoDeAcesso, dto: IEnderecoFindOneByIdInputDto) {
    const endereco = await this.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
