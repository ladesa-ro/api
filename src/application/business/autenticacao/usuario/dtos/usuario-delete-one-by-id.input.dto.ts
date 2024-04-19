import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { UsuarioDtoProperties, UsuarioDtoValidationContract } from './usuario.dto';

// ======================================================

export const UsuarioDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(UsuarioDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('UsuarioDeleteOneByIdInputDto')
export class UsuarioDeleteOneByIdInputDto implements Dto.IUsuarioDeleteOneByIdInputDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;
}

// ======================================================
