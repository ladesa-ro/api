import { IAmbienteModel, IEntityDate, IUsuarioModel } from 'application/business/(spec)';

export interface IReservaModel {
  id: string;

  //

  // Situação da reserva.
  situacao: string;

  // Motivo da reserva.
  motivo: string | null;

  // Definir tipo da reserva.
  tipo: string | null;

  // Data e hora de início da reserva.
  dataInicio: IEntityDate;

  // Data e hora de término da reserva.
  dataTermino: IEntityDate | null | null;

  // Ambiente que foi reservado.
  ambiente: IAmbienteModel;

  // Usuário que fez a reserva.
  usuario: IUsuarioModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
