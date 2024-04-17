import { IImagemFindOneResultDto } from '../../../../base/imagem/operations';
import { ICampusFindOneResultDto } from '../../../campus';
import { IBlocoModel } from '../../IBlocoModel';

export interface IBlocoFindOneResultDto extends Pick<IBlocoModel, 'id' | 'nome' | 'codigo'> {
  campus: ICampusFindOneResultDto;
  imagemCapa: IImagemFindOneResultDto | null;
}
