import { ITurmaFindOneByIdInputDto } from '../turma-find-one';

export interface ITurmaDeleteOneByIdInputDto extends ITurmaFindOneByIdInputDto {
  id: string;
}
