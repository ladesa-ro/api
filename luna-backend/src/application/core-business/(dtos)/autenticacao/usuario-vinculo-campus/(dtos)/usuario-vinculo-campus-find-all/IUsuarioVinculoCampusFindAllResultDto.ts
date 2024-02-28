import { IPaginatedResultDto, IUsuarioVinculoCampusFindOneResultDto } from 'application/core-business/(dtos)';

export interface IUsuarioVinculoCampusFindAllResultDto extends IPaginatedResultDto<IUsuarioVinculoCampusFindOneResultDto> {
  
}
