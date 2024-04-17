import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { UsuarioDtoProperties, UsuarioDtoValidationContract } from './usuario.dto';

// ======================================================

export const UsuarioFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(UsuarioDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('UsuarioFindOneByIdInputDto')
export class UsuarioFindOneByIdInputDto implements Dto.IUsuarioFindOneByIdInputDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;
}

// ======================================================
