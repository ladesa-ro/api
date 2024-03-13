import { IAmbienteModel, ICursoModel, IEntityDate } from 'application/business/(spec)';

export interface ITurmaModel {
  id: string;

  //

  // Período da turma.
  periodo: string;

  // Grupo da turma.
  grupo: string;

  // Nome da turma.
  nome: string;

  // Ambiente padrão da sala de aula.
  ambientePadraoAula: IAmbienteModel | null;

  // Curso que a turma pertence.
  curso: ICursoModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
