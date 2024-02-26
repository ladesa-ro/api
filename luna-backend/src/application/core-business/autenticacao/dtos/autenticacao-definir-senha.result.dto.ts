import { ObjectType } from '@nestjs/graphql';
import { IAutenticacaoDefinirSenhaResultDto } from 'application/core-business/(dtos)';
import { DtoProperty, createDtoPropertyMap } from 'infrastructure';

// ======================================================

export const AutenticacaoDefinirSenhaResultDtoProperties = createDtoPropertyMap({
  DEFINIR_SENHA_RESULT: {
    nullable: true,
    description: 'Resultado da operação.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
});

// ======================================================

@ObjectType('AutenticacaoDefinirSenhaResultDto')
export class AutenticacaoDefinirSenhaResultDto implements IAutenticacaoDefinirSenhaResultDto {
  @DtoProperty(AutenticacaoDefinirSenhaResultDtoProperties.DEFINIR_SENHA_RESULT)
  result!: string;
}

// ======================================================
