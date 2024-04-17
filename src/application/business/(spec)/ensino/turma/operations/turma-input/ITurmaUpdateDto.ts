import { IObjectUuid } from '../../../../(core)';
import { ITurmaFindOneByIdInputDto } from '../turma-find-one/ITurmaFindOneByIdInputDto';
import { ITurmaInputDto } from './ITurmaInputDto';

export interface ITurmaUpdateDto extends ITurmaFindOneByIdInputDto, Partial<Omit<ITurmaInputDto, 'id'>> {
  id: string;

  //

  // Período da turma.
  periodo?: string;

  // Grupo da turma.
  grupo?: string;

  // Nome da turma.
  nome?: string;

  // Ambiente padrão da sala de aula.
  ambientePadraoAula?: IObjectUuid | null;

  // Curso que a turma pertence.
  curso?: IObjectUuid;

  //
}
