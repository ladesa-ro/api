import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { IImagemModel } from '../../../(spec)/base/imagem';
import {
  CommonPropertyUuid,
  DtoProperty,
  ObjectUuidDto,
  ValidationContractObjectUuidBase,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import { CampusDto, CampusFindOneResultDto } from '../../campus/dtos';

// ======================================================

export const BlocoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    nome: ValidationContractString().required().nonNullable(),
    codigo: ValidationContractString().required().nonNullable(),
    //

    campus: ValidationContractObjectUuidBase({ required: true, optional: false }),
  });
});

// ======================================================

export const BlocoDtoProperties = createDtoPropertyMap({
  BLOCO_ID: CommonPropertyUuid('ID do bloco'),

  BLOCO_NOME: {
    nullable: false,
    description: 'Nome do bloco.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  BLOCO_CODIGO: {
    nullable: false,
    description: 'Código / Letra / Número do bloco.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  BLOCO_CAMPUS_INPUT: {
    nullable: false,
    description: 'Campus que o bloco pertence.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: () => ObjectUuidDto,
    },
  },

  BLOCO_CAMPUS_OUTPUT: {
    nullable: false,
    description: 'Campus que o bloco pertence.',
    //
    gql: {
      type: () => CampusDto,
    },
    swagger: {
      type: () => CampusFindOneResultDto,
    },
  },
});

// ======================================================

@ObjectType('Bloco')
export class BlocoDto implements Dto.IBlocoModel {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;

  //

  @DtoProperty(BlocoDtoProperties.BLOCO_NOME)
  nome!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CODIGO)
  codigo!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CAMPUS_OUTPUT)
  campus!: Dto.ICampusModel;

  //

  ambientes!: Dto.IAmbienteModel[];
  imagemCapa!: IImagemModel | null;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}

// ======================================================
