import { ICampusFindOneResultDto, ICursoModel, IModalidadeFindOneResultDto } from '../../../../../(spec)';

export interface ICursoFindOneResultDto extends Pick<ICursoModel, 'id' | 'nome' | 'nomeAbreviado'> {
  campus: ICampusFindOneResultDto;
  modalidade: IModalidadeFindOneResultDto;
}
