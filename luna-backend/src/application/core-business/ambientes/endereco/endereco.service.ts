import { Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import {
  IEnderecoFindOneByIdInputDto,
  IEnderecoFindOneResultDto,
  IEnderecoInputDto,
  IEnderecoModel,
  IRequestContext,
} from '../../../../domain';
import { parsePayloadYup } from '../../../../infrastructure';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';
import { CidadeService } from '../base-cidade/cidade.service';
import { EnderecoInputDtoValidationContract } from './dtos';

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContext) {}

  //

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  //

  static enderecoSelectFindOne(
    qb: SelectQueryBuilder<any>,
    loadCidade = true,
    loadEstado = true,
  ) {
    qb.addSelect([
      'endereco.id',
      'endereco.cep',
      'endereco.logradouro',
      'endereco.numero',
      'endereco.bairro',
      'endereco.complemento',
      'endereco.pontoReferencia',
    ]);

    if (loadCidade) {
      qb.innerJoin('endereco.cidade', 'cidade');
      CidadeService.cidadeSelectFindOne(qb, loadEstado);
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

  async internalEnderecoCreateOrUpdate(
    id: IEnderecoModel['id'] | null,
    payload: IEnderecoInputDto,
  ) {
    const dto = await parsePayloadYup(
      EnderecoInputDtoValidationContract(),
      payload,
    );

    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = <IEnderecoInputDto>{
      ...pick(dto, [
        'cep',
        'logradouro',
        'numero',
        'bairro',
        'complemento',
        'pontoReferencia',
      ]),

      cidade: {
        id: dto.cidade.id,
      },
    };

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  //

  async findById(
    requestContext: IRequestContext,
    dto: IEnderecoFindOneByIdInputDto,
  ): Promise<IEnderecoFindOneResultDto | null> {
    // =========================================================

    const qb = this.enderecoRepository.createQueryBuilder('endereco');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'endereco');

    // =========================================================

    qb.andWhere('endereco.id = :id', { id: dto.id });

    // =========================================================

    qb.select([]);
    EnderecoService.enderecoSelectFindOne(qb, true);
    const endereco = await qb.getOne();

    // =========================================================

    return endereco;
  }

  async findByIdStrict(
    requestContext: IRequestContext,
    dto: IEnderecoFindOneByIdInputDto,
  ) {
    const endereco = await this.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
