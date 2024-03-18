import { IAmbienteFindOneResultDto } from 'application/business/(spec)/ambientes';
import { IDisciplinaFindOneResultDto } from '../../../disciplina';
import { ITurmaFindOneResultDto } from '../../../turma';
import { IDiarioModel } from '../../IDiarioModel';

export interface IDiarioFindOneResultDto extends Pick<IDiarioModel, 'id' | 'situacao' | 'ano' | 'etapa'> {
  turma: ITurmaFindOneResultDto;
  disciplina: IDisciplinaFindOneResultDto;
  ambientePadrao: IAmbienteFindOneResultDto | null;
}
