import { IDisciplinaFindOneByIdInputDto } from '../disciplina-find-one';

export interface IDisciplinaDeleteOneByIdInputDto extends IDisciplinaFindOneByIdInputDto {
  id: string;
}
