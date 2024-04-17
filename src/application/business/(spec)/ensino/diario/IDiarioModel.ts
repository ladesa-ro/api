import * as Dto from 'application/business/(spec)';

export interface IDiarioModel {
  id: string;

  //

  // Situação do diário. Ativo ou inativo.
  situacao: string;

  // Ano do diário.
  ano: number;

  // Etapa/período do diário.
  etapa: string | null;

  // turma que o diario pertence.
  turma: Dto.ITurmaModel;

  // disciplina a qual o diario pertence.
  disciplina: Dto.IDisciplinaModel;

  // Ambiente Padrao do diario.
  ambientePadrao: Dto.IAmbienteModel | null;

  //

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;
}
