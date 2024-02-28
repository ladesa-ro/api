import { IPaginatedResultDto, IUsuarioVinculoCampusFindOneResultDto } from 'application/business/(dtos)';

export interface IUsuarioVinculoCampusFindAllResultDto extends IPaginatedResultDto<IUsuarioVinculoCampusFindOneResultDto> {}
