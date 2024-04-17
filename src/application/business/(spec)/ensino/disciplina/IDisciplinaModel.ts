import * as Dto from 'application/business/(spec)';

export interface IDisciplinaModel {
  id: string;

  //

  // Nome da disciplina.
  nome: string;

  // Carga horária da disciplina.
  cargaHoraria: number;

  // Imagem de capa do diário.
  imagemCapa: Dto.IImagemModel | null;

  //

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;
}
