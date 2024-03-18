import { IEntityDate, IObjectUuid } from '../../../../(core)';
import { IReservaFindOneByIdInputDto } from '../reserva-find-one/IReservaFindOneByIdInputDto';
import { IReservaInputDto } from './IReservaInputDto';

export interface IReservaUpdateDto extends IReservaFindOneByIdInputDto, Partial<Omit<IReservaInputDto, 'id'>> {
  id: string;

  //

  // Situação da reserva.
  situacao?: string;

  // Motivo da reserva.
  motivo?: string | null;

  // Definir tipo da reserva.
  tipo?: string | null;

  // Data e hora de início da reserva.
  dataInicio?: IEntityDate;

  // Data e hora de término da reserva.
  dataTermino?: IEntityDate | null | null;

  // Ambiente que foi reservado.
  ambiente?: IObjectUuid;

  // Usuário que fez a reserva.
  usuario?: IObjectUuid;

  //
}
