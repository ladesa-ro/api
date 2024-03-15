import { InputType, ObjectType } from '@nestjs/graphql';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CursoDto, CursoDtoProperties, CursoDtoValidationContract } from './curso.dto';

//====================================================

@ObjectType('CalendarioLetivoFindOneResult')
export class CalendarioLetivoDto implements Dto.ICalendarioLetivoFindOneResultDto{
    
}