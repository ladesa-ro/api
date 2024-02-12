import { ICidadeModel } from '../../ICidadeModel';

export interface ICidadeFindOneResultDto
  extends Pick<ICidadeModel, 'id' | 'nome'> {
  id: number;
  nome: string;
}
