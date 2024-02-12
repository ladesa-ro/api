import { IEstadoModel } from '../../(models)';

export interface IEstadoFindOneResultDto
  extends Pick<IEstadoModel, 'id' | 'nome' | 'sigla'> {
  id: number;

  nome: string;
  sigla: string;
}
