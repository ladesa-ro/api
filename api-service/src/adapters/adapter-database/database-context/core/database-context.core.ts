import { DataSource, EntityManager } from 'typeorm';
import * as repositories from '../../typeorm/repositories';

export class DatabaseContextCore {
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

  async startTransaction() {
    const transactionManager = {
      finished: false,
      transactionPromise: {} as Promise<void>,
      databaseContext: {} as DatabaseContextCore,
      commit: {} as () => Promise<void>,
      rollback: {} as () => Promise<void>,
    };

    transactionManager.transactionPromise = this.transaction((ds) => {
      transactionManager.databaseContext = ds.databaseContext;

      return new Promise<void>((resolve, reject) => {
        transactionManager.commit = () => {
          if (!transactionManager.finished) {
            resolve();
          }

          return transactionManager.transactionPromise;
        };

        transactionManager.rollback = () => {
          if (!transactionManager.finished) {
            reject();
          }

          return transactionManager.transactionPromise.finally();
        };
      });
    });

    transactionManager.transactionPromise.finally();

    return transactionManager;
  }

  //

  // =====================================================
  // == [ AUTENTICAÇÃO ] ====================================
  // =====================================================

  get usuarioRepository() {
    return repositories.createUsuarioRepository(this.ds);
  }

  get vinculoRepository() {
    return repositories.createVinculoRepository(this.ds).extend({});
  }

  //

  // =====================================================
  // == [ BASE ] =========================================
  // =====================================================

  get arquivoRepository() {
    return repositories.createArquivoRepository(this.ds);
  }

  get imagemRepository() {
    return repositories.createImagemRepository(this.ds);
  }

  get imagemArquivoRepository() {
    return repositories.createImagemArquivoRepository(this.ds);
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

  get reservaRepository() {
    return repositories.createReservaRepository(this.ds);
  }

  // =====================================================
  // == [ Ensino ] =======================================
  // =====================================================

  get modalidadeRepository() {
    return repositories.createModalidadeRepository(this.ds);
  }

  get campusPossuiModalidadeRepository() {
    return repositories.createCampusPossuiModalidadeRepository(this.ds);
  }

  get cursoRepository() {
    return repositories.createCursoRepository(this.ds);
  }

  get disciplinaRepository() {
    return repositories.createDisciplinaRepository(this.ds);
  }

  get turmaRepository() {
    return repositories.createTurmaRepository(this.ds);
  }

  get diarioRepository() {
    return repositories.createDiarioRepository(this.ds);
  }

  get diarioProfessorRepository() {
    return repositories.createDiarioProfessorRepository(this.ds);
  }

  // =====================================================
  // == [ Calendario ] =======================================
  // =====================================================

  get calendarioLetivoRepository() {
    return repositories.createCalendarioLetivoRepository(this.ds);
  }

  // =====================================================

  get eventoRepository() {
    return repositories.createEventoRepository(this.ds);
  }

  // =====================================================

  get diaCalendarioRepository() {
    return repositories.createDiaCalendarioRepository(this.ds);
  }
  // =====================================================

  get etapaRepository() {
    return repositories.createEtapaRepository(this.ds);
  }
  // =====================================================

  get intervaloDeTempoRepository() {
    return repositories.createIntervaloDeTempoRepository(this.ds);
  }
  // =====================================================


  get aulaRepository() {
    return repositories.createAulaRepository(this.ds);
  }
  
  // =====================================================
  // == [ Horario Academico ] ============================
  // =====================================================

  get turmaDisponibilidadeRepository() {
    return repositories.createTurmaDisponibilidadeRepository(this.ds);
  }
  // =====================================================
  get turmaDisponibilidadeDiaRepository() {
    return repositories.createTurmaDisponibilidadeDiaRepository(this.ds);
  }

  // =====================================================
  get DisponibilidadeProfessorRepository() {
    return repositories.createDisponibilidadeProfessorRepository(this.ds);
  }

  // =====================================================
  get DisponibilidadeProfessorDiaRepository() {
    return repositories.createDisponibilidadeProfessorDiaRepository(this.ds);
  }

  // =====================================================
  get diarioPreferenciaAgrupamentoRepository() {
    return repositories.createDiarioPreferenciaAgrupamentoRepository(this.ds);
  }

  // =====================================================
  get horarioGeradoRepository() {
    return repositories.createHorarioGeradoRepository(this.ds);
  }

  // =====================================================
    get horarioGeradoAulaRepository() {
      return repositories.createHorarioGeradoAulaRepository(this.ds);
    }

  // =====================================================
}
