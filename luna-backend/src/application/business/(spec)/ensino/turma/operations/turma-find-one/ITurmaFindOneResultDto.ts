import { IAmbienteFindOneResultDto } from '../../../../ambientes';
import { IImagemFindOneResultDto } from '../../../../base';
import { ICursoFindOneResultDto } from '../../../curso';
import { ITurmaModel } from '../../ITurmaModel';

export interface ITurmaFindOneResultDto extends Pick<ITurmaModel, 'id' | 'periodo' | 'grupo' | 'nome'> {
  ambientePadraoAula: IAmbienteFindOneResultDto | null;
  curso: ICursoFindOneResultDto;
  imagemCapa: IImagemFindOneResultDto | null;
}
