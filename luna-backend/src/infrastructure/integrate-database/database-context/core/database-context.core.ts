import { DataSource, EntityManager } from 'typeorm';
import * as repositories from '../../typeorm/repositories';

export class DatabaseContextCore {
  get cursoRepository() {
    return repositories.createCursoRepository(this.ds);
  }
  constructor(readonly ds: DataSource | EntityManager) {}

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
    return repositories.createUsuarioRepository(this.ds);
  }

  get usuarioVinculoCampusRepository() {
    return repositories.createUsuarioVinculoCampusRepository(this.ds).extend({});
  }

  // =====================================================
  // == [ AMBIENTES ] ====================================
  // =====================================================

  get estadoRepository() {
    return repositories.createEstadoRepository(this.ds);
  }

  get cidadeRepository() {
    return repositories.createCidadeRepository(this.ds);
  }

  get enderecoRepository() {
    return repositories.createEnderecoRepository(this.ds);
  }

  get campusRepository() {
    return repositories.createCampusRepository(this.ds);
  }

  get blocoRepository() {
    return repositories.createBlocoRepository(this.ds);
  }

  get ambienteRepository() {
    return repositories.createAmbienteRepository(this.ds);
  }

  // =====================================================
  // == [ Ensino ] =======================================
  // =====================================================

  get modalidadeRepository() {
    return repositories.createModalidadeRepository(this.ds);
  }

  // =====================================================
}