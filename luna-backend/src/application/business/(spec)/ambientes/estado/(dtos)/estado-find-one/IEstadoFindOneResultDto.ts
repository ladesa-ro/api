import { IEstadoModel } from '../../IEstadoModel';

export interface IEstadoFindOneResultDto extends Pick<IEstadoModel, 'id' | 'nome' | 'sigla'> {
  id: number;

  nome: string;
  sigla: string;
}
