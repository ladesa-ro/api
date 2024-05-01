import { Injectable, NotFoundException } from '@nestjs/common';
import { IEnderecoFindOneByIdInputDto, IEnderecoFindOneResultDto, IEnderecoInputDto, IEnderecoModel } from '@sisgea/spec';
import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import type { IContextoDeAcesso } from '../../../../domain';
import { parsePayloadYup } from '../../../../infraestrutura';
import { DatabaseContextService } from '../../../../infraestrutura/integrate-database/database-context/database-context.service';
import { EnderecoInputDtoValidationContract } from './dtos';

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
    AppResourceView(AppResource.CIDADE, qb, `${alias}_cidade`);
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
