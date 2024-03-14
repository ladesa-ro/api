import { IDiarioModel } from '../../IDiarioModel';

export interface IDiarioInputDto extends Pick<IDiarioModel, 'situacao' | 'ano' | 'etapa' | 'turma' | 'disciplina' | 'ambientePadrao'> {}
