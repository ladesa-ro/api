import { IDiarioModel } from '../../IDiarioModel';

export interface IDiarioFindOneResultDto extends Pick<IDiarioModel, 'id' | 'situacao' | 'ano' | 'etapa' | 'turma' | 'disciplina' | 'ambientePadrao'> {}
