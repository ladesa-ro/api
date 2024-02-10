import { DataSource, EntityManager } from 'typeorm';
import { createBaseCidadeRepository } from '../repositories/base-cidade.repository';
import { createBaseEstadoRepository } from '../repositories/base-estado.repository';
import { createEnderecoRepository } from '../repositories/endereco.repository';

export class DatabaseContext {
  constructor(readonly ds: DataSource | EntityManager) {}

  // ...

  static new(ds: DataSource | EntityManager) {
    return new DatabaseContext(ds);
  }

  // ...

  get baseEstadoRepository() {
    return createBaseEstadoRepository(this.ds);
  }

  get baseCidadeRepository() {
    return createBaseCidadeRepository(this.ds);
  }

  get enderecoRepository() {
    return createEnderecoRepository(this.ds);
  }
}
