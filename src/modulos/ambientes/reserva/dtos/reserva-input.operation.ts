import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { ReservaDtoProperties, ReservaDtoValidationContract } from './reserva.dto';

// ======================================================

export const ReservaInputDtoValidationContract = createValidationContract(() => {
  const schema = ReservaDtoValidationContract();

  return yup.object().shape({
    situacao: getSchemaField(schema, 'situacao'),
    motivo: getSchemaField(schema, 'motivo'),
    tipo: getSchemaField(schema, 'tipo'),
    dataInicio: getSchemaField(schema, 'dataInicio'),
    dataTermino: getSchemaField(schema, 'dataTermino'),
  });
});

// ======================================================

@InputType('ReservaInputDto')
export class ReservaInputDto implements Dto.IReservaInputDto {
  //

  @DtoProperty(ReservaDtoProperties.RESERVA_SITUACAO)
  situacao!: string;

  @DtoProperty(ReservaDtoProperties.RESERVA_MOTIVO)
  motivo!: string | null;

  @DtoProperty(ReservaDtoProperties.RESERVA_TIPO)
  tipo!: string | null;

  @DtoProperty(ReservaDtoProperties.RESERVA_DATA_INICIO)
  dataInicio!: Dto.IEntityDate;

  @DtoProperty(ReservaDtoProperties.RESERVA_DATA_TERMINO)
  dataTermino!: Dto.IEntityDate | null | null;

  @DtoProperty(ReservaDtoProperties.RESERVA_AMBIENTE_INPUT)
  ambiente!: Dto.IObjectUuid;

  @DtoProperty(ReservaDtoProperties.RESERVA_USUARIO_INPUT)
  usuario!: Dto.IObjectUuid;

  //
}
