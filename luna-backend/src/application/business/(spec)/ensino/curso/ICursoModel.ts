import { ICampusModel, IEntityDate, IModalidadeModel } from 'application/business/(spec)';

export interface ICursoModel {
  id: string;

  //

  // Nome do Curso
  nome: string;

  // Nome abreviado do curso
  nomeAbreviado: string;

  // Campus que o Curso pertence
  campus: ICampusModel;

  // Modalidade a que o Curso Pertence
  modalidade: IModalidadeModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
