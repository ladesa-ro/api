import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { ReservaDtoProperties, ReservaDtoValidationContract } from './reserva.dto';

// ======================================================

export const ReservaDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(ReservaDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('ReservaDeleteOneByIdInputDto')
export class ReservaDeleteOneByIdInputDto implements Dto.IReservaDeleteOneByIdInputDto {
  @DtoProperty(ReservaDtoProperties.RESERVA_ID)
  id!: string;
}

// ======================================================

export const RESERVA_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "reserva" por ID.',

  gql: {
    name: 'reservaDeleteOneById',

    inputDtoType: () => ReservaDeleteOneByIdInputDto,
    inputDtoValidationContract: ReservaDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "reserva".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
