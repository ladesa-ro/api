import { ICampusModel, IEntityDate, IModalidadeModel } from 'application/business/(spec)';

export interface ICursoModel {
  id: string;

  //

  // Nome do curso
  nome: string;

  // Nome abreviado do curso
  nomeAbreviado: string;

  // Campus que o curso pertence
  campus: ICampusModel;

  // Modalidade a que o curso pertence
  modalidade: IModalidadeModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
