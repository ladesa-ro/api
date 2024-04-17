import { ICampusFindOneResultDto, ICursoModel, IImagemFindOneResultDto, IModalidadeFindOneResultDto } from '../../../..';

export interface ICursoFindOneResultDto extends Pick<ICursoModel, 'id' | 'nome' | 'nomeAbreviado'> {
  campus: ICampusFindOneResultDto;
  modalidade: IModalidadeFindOneResultDto;
  imagemCapa: IImagemFindOneResultDto | null;
}
