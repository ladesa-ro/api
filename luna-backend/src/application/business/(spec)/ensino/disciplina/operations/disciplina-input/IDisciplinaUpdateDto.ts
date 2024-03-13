import { IDisciplinaFindOneByIdInputDto } from '../disciplina-find-one/IDisciplinaFindOneByIdInputDto';
import { IDisciplinaInputDto } from './IDisciplinaInputDto';

export interface IDisciplinaUpdateDto extends IDisciplinaFindOneByIdInputDto, Partial<Omit<IDisciplinaInputDto, 'id'>> {
  id: string;

  //

  // Nome da disciplina.
  nome?: string;

  // Carga horária da disciplina.
  cargaHoraria?: number;

  //
}
