import { IAmbienteModel, IDisciplinaModel, IEntityDate, ITurmaModel } from 'application/business/(spec)';

export interface IDiarioModel {
  id: string;

  //

  // Situação do diário. Ativo ou inativo.
  situacao: string;

  // Ano do diário.
  ano: number;

  // Etapa/período do diário.
  etapa: string | null;

  // turma que o diario pertence
  turma: ITurmaModel;

  // disciplina a qual o diario pertence
  disciplina: IDisciplinaModel;

  // Ambiente Padrao do diario
  ambientePadrao: IAmbienteModel | null;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;
}
