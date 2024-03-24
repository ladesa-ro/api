import * as Dto from 'application/business/(spec)';

export interface ICursoModel extends Dto.IObjectUuid, Dto.IDatedObject {
  id: string;

  //

  // Nome do curso
  nome: string;

  // Nome abreviado do curso
  nomeAbreviado: string;

  // Campus que o curso pertence
  campus: Dto.ICampusModel;

  // Modalidade a que o curso pertence
  modalidade: Dto.IModalidadeModel;

  //

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;
}
