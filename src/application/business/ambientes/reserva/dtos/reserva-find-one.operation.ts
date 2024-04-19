import { InputType, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { ReservaDto, ReservaDtoProperties, ReservaDtoValidationContract } from './reserva.dto';

// ======================================================

@ObjectType('ReservaFindOneResultDto')
export class ReservaFindOneResultDto implements Dto.IReservaFindOneResultDto {
  @DtoProperty(ReservaDtoProperties.RESERVA_ID)
  id!: string;

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

  @DtoProperty(ReservaDtoProperties.RESERVA_AMBIENTE_OUTPUT)
  ambiente!: Dto.IAmbienteFindOneResultDto;

  @DtoProperty(ReservaDtoProperties.RESERVA_USUARIO_OUTPUT)
  usuario!: Dto.IUsuarioFindOneResultDto;

  //
}

// ======================================================

export const ReservaFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(ReservaDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('ReservaFindOneByIdInputDto')
export class ReservaFindOneByIdInputDto implements Dto.IReservaFindOneByIdInputDto {
  @DtoProperty(ReservaDtoProperties.RESERVA_ID)
  id!: string;
}

export const RESERVA_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "reserva"" por ID.',

  gql: {
    name: 'reservaFindOneById',

    inputDtoType: () => ReservaFindOneByIdInputDto,
    inputDtoValidationContract: ReservaFindOneByIdInputValidationContract,

    returnType: () => ReservaDto,
  },

  swagger: {
    returnType: ReservaFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da reserva.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
