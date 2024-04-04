import { IDiarioModel, IEntityDate, IUsuarioVinculoCampusModel } from 'application/business/(spec)';

export interface IDiarioProfessorModel {
  id: string;

  //

  // Situação do vínculo.
  situacao: boolean;

  // Diário do vínculo.
  diario: IDiarioModel;

  // Vínculo de usuário-professor.
  vinculoProfessor: IUsuarioVinculoCampusModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
