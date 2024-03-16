import { IObjectUuid } from 'application/business/(spec)/(core)';
import { IDiarioModel } from '../../IDiarioModel';

export interface IDiarioInputDto extends Pick<IDiarioModel, 'situacao' | 'ano' | 'etapa' | 'turma'> {
  disciplina: IObjectUuid;
  ambientePadrao: IObjectUuid | null;
}
