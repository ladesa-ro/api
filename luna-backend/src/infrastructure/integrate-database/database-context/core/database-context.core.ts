import { DataSource, EntityManager } from 'typeorm';
import { createAmbienteRepository } from '../../typeorm/repositories/ambientes/ambiente.repository';
import { createBlocoRepository } from '../../typeorm/repositories/ambientes/bloco.repository';
import { createCampusRepository } from '../../typeorm/repositories/ambientes/campus.repository';
import { createBaseCidadeRepository } from '../../typeorm/repositories/base-cidade.repository';
import { createBaseEstadoRepository } from '../../typeorm/repositories/base-estado.repository';
import { createEnderecoRepository } from '../../typeorm/repositories/endereco.repository';

export class DatabaseContextCore {
  constructor(readonly ds: DataSource | EntityManager) {}

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

  get campusRepository() {
    return createCampusRepository(this.ds);
  }

  get blocoRepository() {
    return createBlocoRepository(this.ds);
  }

  get ambienteRepository() {
    return createAmbienteRepository(this.ds);
  }
}
