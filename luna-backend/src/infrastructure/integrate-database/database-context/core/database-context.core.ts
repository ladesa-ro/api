import { DataSource, EntityManager } from 'typeorm';
import { createAmbienteRepository } from '../../typeorm/repositories/ambientes/ambiente.repository';
import { createBlocoRepository } from '../../typeorm/repositories/ambientes/bloco.repository';
import { createCampusRepository } from '../../typeorm/repositories/ambientes/campus.repository';
import { createCidadeRepository } from '../../typeorm/repositories/ambientes/cidade.repository';
import { createEnderecoRepository } from '../../typeorm/repositories/ambientes/endereco.repository';
import { createEstadoRepository } from '../../typeorm/repositories/ambientes/estado.repository';
import { createUsuarioVinculoCampusRepository } from '../../typeorm/repositories/autenticacao/usuario-vinculo-campus.repository';
import { createUsuarioRepository } from '../../typeorm/repositories/autenticacao/usuario.repository';
import { createModalidadeRepository } from '../../typeorm/repositories/ensino/modalidade.repository';

export class DatabaseContextCore {
  constructor(readonly ds: DataSource | EntityManager) { }

  //

  get dataSource() {
    if (this.ds instanceof DataSource) {
      return this.ds;
    }

    return this.ds.connection;
  }

  get entityManager() {
    if (this.ds instanceof EntityManager) {
      return this.ds;
    }

    return this.ds.manager;
  }

  async transaction<T>(callback: (context: { databaseContext: DatabaseContextCore }) => T | Promise<T>): Promise<T> {
    return this.ds.transaction(async (entityManager) => {
      const databaseContextForTransaction = new DatabaseContextCore(entityManager);
      return callback({ databaseContext: databaseContextForTransaction });
    });
  }

  //

  // =====================================================
  // == [ AUTENTICAÇÃO ] ====================================
  // =====================================================

  get usuarioRepository() {
    return createUsuarioRepository(this.ds);
  }

  get usuarioVinculoCampusRepository() {
    return createUsuarioVinculoCampusRepository(this.ds).extend({});
  }

  // =====================================================
  // == [ AMBIENTES ] ====================================
  // =====================================================

  get estadoRepository() {
    return createEstadoRepository(this.ds);
  }

  get cidadeRepository() {
    return createCidadeRepository(this.ds);
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


  // =====================================================
  // == [ Ensino ] =======================================
  // =====================================================


  get ModalidadeRepository() {
    return createModalidadeRepository(this.ds);
  }

  // =====================================================
}
