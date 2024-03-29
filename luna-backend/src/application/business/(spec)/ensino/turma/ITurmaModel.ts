import * as Dto from 'application/business/(spec)';

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
  ambientePadraoAula: Dto.IAmbienteModel | null;

  // Curso que a turma pertence.
  curso: Dto.ICursoModel;

  // Imagem de capa da turma.
  imagemCapa: Dto.IImagemModel | null;

  //

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;
}
