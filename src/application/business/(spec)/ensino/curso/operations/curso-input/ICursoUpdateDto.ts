import { IObjectUuid } from '../../../../(core)';
import { ICursoFindOneByIdInputDto } from '../curso-find-one/ICursoFindOneByIdInputDto';
import { ICursoInputDto } from './ICursoInputDto';

export interface ICursoUpdateDto extends ICursoFindOneByIdInputDto, Partial<Omit<ICursoInputDto, 'id'>> {
  id: string;

  //

  // Nome do curso
  nome?: string;

  // Nome abreviado do curso
  nomeAbreviado?: string;

  // Campus que o curso pertence
  campus?: IObjectUuid;

  // Modalidade a que o curso pertence
  modalidade?: IObjectUuid;

  //
}
