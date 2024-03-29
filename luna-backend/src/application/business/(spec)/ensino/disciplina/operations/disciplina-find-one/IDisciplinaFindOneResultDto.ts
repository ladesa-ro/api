import { IImagemFindOneResultDto } from '../../../../base';
import { IDisciplinaModel } from '../../IDisciplinaModel';

export interface IDisciplinaFindOneResultDto extends Pick<IDisciplinaModel, 'id' | 'nome' | 'cargaHoraria'> {
  imagemCapa: IImagemFindOneResultDto | null;
}
