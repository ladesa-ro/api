import { IDiarioFindOneByIdInputDto } from '../diario-find-one';

export interface IDiarioDeleteOneByIdInputDto extends IDiarioFindOneByIdInputDto {
  id: string;
}
