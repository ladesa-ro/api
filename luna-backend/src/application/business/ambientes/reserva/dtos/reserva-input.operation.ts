import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
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
    ambiente: getSchemaField(schema, 'ambiente'),
    usuario: getSchemaField(schema, 'usuario'),
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
