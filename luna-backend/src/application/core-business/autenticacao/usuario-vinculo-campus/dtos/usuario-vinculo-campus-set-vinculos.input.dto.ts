import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import { DtoProperty, createDtoPropertyMap, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { UsuarioVinculoCampusDtoProperties, UsuarioVinculoCampusDtoValidationContract } from './usuario-vinculo-campus.dto';

// ======================================================

export const UsuarioVinculoCampusSetVinculosInputValidationContract = createValidationContract(() => {
  const schema = UsuarioVinculoCampusDtoValidationContract();

  return yup.object().shape({
    cargos: yup.array(getSchemaField(schema, 'cargo')).defined().nonNullable(),
    campus: getSchemaField(schema, 'campus'),
    usuario: getSchemaField(schema, 'usuario'),
  });
});

// ======================================================

export const UsuarioVinculoCampusSetVinculosDtoProperties = createDtoPropertyMap({
  VINCULO_CARGOS: {
    nullable: false,
    description: 'Cargos a serem alterados.',
    //
    gql: {
      type: () => [String],
    },
    swagger: {
      type: [String],
      enum: ['dape', 'professor'],
    },
  },
});

// ======================================================

@InputType('UsuarioVinculoCampusSetVinculosInputDto')
export class UsuarioVinculoCampusSetVinculosInputDto implements Dto.IUsuarioVinculoCampusSetVinculosInputDto {
  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CAMPUS_INPUT)
  campus!: Dto.IObjectUuid;

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_USUARIO_INPUT)
  usuario!: Dto.IObjectUuid;

  @DtoProperty(UsuarioVinculoCampusSetVinculosDtoProperties.VINCULO_CARGOS)
  cargos!: string[];
}

// ======================================================
