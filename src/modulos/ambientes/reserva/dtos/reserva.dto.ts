import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { CommonPropertyUuid, DtoProperty, ObjectUuidDto, createDtoPropertyMap } from '../../../../legacy';
import { ValidationContractObjectUuidBase, ValidationContractString, ValidationContractUuid, createValidationContract } from '../../../../validacao';
import { UsuarioDto, UsuarioFindOneResultDto } from '../../../autenticacao/usuario/usuario.dtos';
import { AmbienteDto, AmbienteFindOneResultDto } from '../../ambiente/dtos';

// ======================================================

export const ReservaDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    situacao: ValidationContractString().required().nonNullable(),
    motivo: ValidationContractString().required().nonNullable(),
    tipo: ValidationContractString().required().nonNullable(),
    // TODO: validar Date | number | timetstamp
    dataInicio: yup.mixed(),
    dataTermino: yup.mixed(),
    //
    ambiente: ValidationContractObjectUuidBase({ required: true, optional: false }),
    usuario: ValidationContractObjectUuidBase({ required: true, optional: false }),
  });
});

// ======================================================

export const ReservaDtoProperties = createDtoPropertyMap({
  RESERVA_ID: CommonPropertyUuid('ID de "reserva"'),

  //

  RESERVA_SITUACAO: {
    nullable: false,
    description: 'Situação da reserva.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  RESERVA_MOTIVO: {
    nullable: true,
    description: 'Motivo da reserva.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  RESERVA_TIPO: {
    nullable: true,
    description: 'Definir tipo da reserva.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  RESERVA_DATA_INICIO: {
    nullable: false,
    description: 'Data e hora de início da reserva.',
    //
    gql: {
      type: () => Date,
    },
    swagger: {
      type: 'string',
    },
  },
  RESERVA_DATA_TERMINO: {
    nullable: true,
    description: 'Data e hora de término da reserva.',
    //
    gql: {
      type: () => Date,
    },
    swagger: {
      type: 'string',
    },
  },

  RESERVA_AMBIENTE_INPUT: {
    nullable: false,
    description: 'Ambiente que foi reservado.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },
  RESERVA_AMBIENTE_OUTPUT: {
    nullable: false,
    description: 'Ambiente que foi reservado.',
    //
    gql: {
      type: () => AmbienteDto,
    },
    swagger: {
      type: AmbienteFindOneResultDto,
    },
  },

  RESERVA_USUARIO_INPUT: {
    nullable: false,
    description: 'Usuário que fez a reserva.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },
  RESERVA_USUARIO_OUTPUT: {
    nullable: false,
    description: 'Usuário que fez a reserva.',
    //
    gql: {
      type: () => UsuarioDto,
    },
    swagger: {
      type: UsuarioFindOneResultDto,
    },
  },
  //
});

// ======================================================

@ObjectType('Reserva')
export class ReservaDto implements Dto.IReservaModel {
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
  ambiente!: Dto.IAmbienteModel;

  @DtoProperty(ReservaDtoProperties.RESERVA_USUARIO_OUTPUT)
  usuario!: Dto.IUsuarioModel;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
