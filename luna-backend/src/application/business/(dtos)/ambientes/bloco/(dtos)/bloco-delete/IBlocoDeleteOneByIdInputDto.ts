import { IBlocoFindOneByIdInputDto } from '../bloco-find-one';

export interface IBlocoDeleteOneByIdInputDto extends IBlocoFindOneByIdInputDto {
  id: string;
}
