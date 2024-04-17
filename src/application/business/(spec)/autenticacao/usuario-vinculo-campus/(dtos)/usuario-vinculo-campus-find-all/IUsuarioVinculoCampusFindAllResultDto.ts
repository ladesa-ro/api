import { IPaginatedResultDto, IUsuarioVinculoCampusFindOneResultDto } from 'application/business/(spec)';

export interface IUsuarioVinculoCampusFindAllResultDto extends IPaginatedResultDto<IUsuarioVinculoCampusFindOneResultDto> {}
