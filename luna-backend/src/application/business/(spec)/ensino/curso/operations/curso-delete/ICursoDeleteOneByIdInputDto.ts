import { ICursoFindOneByIdInputDto } from '../curso-find-one';

export interface ICursoDeleteOneByIdInputDto extends ICursoFindOneByIdInputDto {
  id: string;
}
