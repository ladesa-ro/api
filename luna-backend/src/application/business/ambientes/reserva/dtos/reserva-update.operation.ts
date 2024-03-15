import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaSubpath } from '../../../../../infrastructure';
import { ReservaFindOneByIdInputValidationContract, ReservaFindOneResultDto } from './reserva-find-one.operation';
import { ReservaInputDtoValidationContract } from './reserva-input.operation';
import { ReservaDto, ReservaDtoProperties } from './reserva.dto';

// ======================================================

export const ReservaUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = ReservaInputDtoValidationContract();

  return yup
    .object()
    .concat(ReservaFindOneByIdInputValidationContract())
    .concat(schema.partial().omit([]))
    .shape({
      usuario: (getSchemaSubpath(schema, 'usuario') as yup.ObjectSchema<any, any>)
        .nonNullable()
        .optional()
        .default(() => undefined),

      ambiente: (getSchemaSubpath(schema, 'ambiente') as yup.ObjectSchema<any, any>)
        .nonNullable()
        .optional()
        .default(() => undefined),
    });
});

// ======================================================

@InputType('ReservaUpdateInputDto')
export class ReservaUpdateInputDto implements Dto.IReservaUpdateDto {
  @DtoProperty(ReservaDtoProperties.RESERVA_ID)
  id!: string;

  //

  @DtoProperty(ReservaDtoProperties.RESERVA_SITUACAO, { required: false })
  situacao?: string;

  @DtoProperty(ReservaDtoProperties.RESERVA_MOTIVO, { required: false })
  motivo?: string | null;

  @DtoProperty(ReservaDtoProperties.RESERVA_TIPO, { required: false })
  tipo?: string | null;

  @DtoProperty(ReservaDtoProperties.RESERVA_DATA_INICIO, { required: false })
  dataInicio?: Dto.IEntityDate;

  @DtoProperty(ReservaDtoProperties.RESERVA_DATA_TERMINO, { required: false })
  dataTermino?: Dto.IEntityDate | null | null;

  @DtoProperty(ReservaDtoProperties.RESERVA_AMBIENTE_INPUT, { required: false })
  ambiente?: Dto.IObjectUuid;

  @DtoProperty(ReservaDtoProperties.RESERVA_USUARIO_INPUT, { required: false })
  usuario?: Dto.IObjectUuid;

  //
}

export class ReservaUpdateWithoutIdInputDto extends OmitType(ReservaUpdateInputDto, ['id'] as const) {}
export const RESERVA_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "reserva".',

  gql: {
    name: 'reservaUpdate',

    inputDtoType: () => ReservaUpdateInputDto,
    inputDtoValidationContract: ReservaUpdateInputDtoValidationContract,

    returnType: () => ReservaDto,
  },

  swagger: {
    inputBodyType: ReservaUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => ReservaUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "reserva".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: ReservaFindOneResultDto,
  },
});
