import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import {
    CommonPropertyUuid,
    DtoProperty,
    ObjectUuidDto,
    ValidationContractObjectUuid,
    ValidationContractString,
    ValidationContractUuid,
    createDtoPropertyMap,
    createValidationContract,
} from '../../../../../infrastructure';
import { CampusDto, CampusFindOneResultDto } from '../../../ambientes/campus/dtos';

// ======================================================

export const ModalidadeDtoValidationContract = createValidationContract(() => {
    return yup.object({
        id: ValidationContractUuid(),

        //

        nome: ValidationContractString().required().nonNullable(),
        slug: ValidationContractString().required().nonNullable(),

        //

        campus: ValidationContractObjectUuid({ required: true }).defined().required(),
    });
});

// ======================================================

export const ModalidadeDtoProperties = createDtoPropertyMap({
    MODALIDADE_ID: CommonPropertyUuid('ID da Modalidade'),

    MODALIDADE_NOME: {
        nullable: false,
        description: 'Nome da Modalidade.',
        //
        gql: {
            type: () => String,
        },
        swagger: {
            type: 'string',
        },
    },

    MODALIDADE_SLUG: {
        nullable: false,
        description: 'Slug da Modalidade.',
        //
        gql: {
            type: () => String,
        },
        swagger: {
            type: 'string',
        },
    },

    MODALIDADE_CAMPUS_INPUT: {
        nullable: false,
        description: 'Campus que a modalidade pertence.',
        //
        gql: {
            type: () => ObjectUuidDto,
        },
        swagger: {
            type: () => ObjectUuidDto,
        },
    },

    MODALIDADE_CAMPUS_OUTPUT: {
        nullable: false,
        description: 'Campus que a modalidade pertence.',
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

@ObjectType('Modalidade')
export class ModalidadeDto implements Dto.IModalidadeModel {
    @DtoProperty(ModalidadeDtoProperties.MODALIDADE_ID)
    id!: string;

    //

    @DtoProperty(ModalidadeDtoProperties.MODALIDADE_NOME)
    nome!: string;

    @DtoProperty(ModalidadeDtoProperties.MODALIDADE_SLUG)
    slug!: string;

    @DtoProperty(ModalidadeDtoProperties.MODALIDADE_CAMPUS_OUTPUT)
    campus!: Dto.ICampusModel;

    //


    //

    dateCreated!: Dto.IEntityDate;
    dateUpdated!: Dto.IEntityDate;
    dateDeleted!: Dto.IEntityDate | null;
}