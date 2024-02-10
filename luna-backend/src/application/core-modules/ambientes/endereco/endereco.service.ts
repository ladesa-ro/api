import { Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { IEnderecoCreateDto, IEnderecoModel } from '../../../../domain';
import { parsePayloadYup } from '../../../../infrastructure';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';
import { EnderecoInputContract } from './dtos';

@Injectable()
export class EnderecoService {
  constructor(
    //
    private databaseContext: DatabaseContext,
  ) {}

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

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
    payload: IEnderecoCreateDto,
  ) {
    const dto = await parsePayloadYup(EnderecoInputContract(), payload);

    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    this.enderecoRepository.merge(
      endereco,
      <IEnderecoCreateDto>(
        pick(dto, [
          'cep',
          'logradouro',
          'numero',
          'bairro',
          'complemento',
          'pontoReferencia',
          'cidade.id',
        ])
      ),
    );

    await this.enderecoRepository.save(endereco);

    return endereco;
  }
}
