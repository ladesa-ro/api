import { IEntityDate } from 'application/business/(spec)';

export interface IDisciplinaModel {
  id: string;

  //

  // Nome da disciplina.
  nome: string;

  // Carga horária da disciplina.
  cargaHoraria: number;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
