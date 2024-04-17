import { InputType } from '@nestjs/graphql';
import { DtoProperty, ValidationContractString, createDtoOperationOptions, createDtoPropertyMap, createValidationContract } from 'infrastructure';
import * as yup from 'yup';
import * as Dto from '../../(spec)';
import { AutenticacaoLoginResultDto } from './autenticacao-login.operation';

// ======================================================

export const AutenticacaoRefreshDtoValidationContract = createValidationContract(() => {
  return yup.object().shape({
    refreshToken: ValidationContractString().required().nonNullable().min(5),
  });
});

// ======================================================

export const AutenticacaoRefreshDtoProperties = createDtoPropertyMap({
  REFRESH_REFRESH_TOKEN: {
    nullable: false,
    description: 'Refresh token.',
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

@InputType('AutenticacaoRefreshInputDto')
export class AutenticacaoRefreshInputDto implements Dto.IAutenticacaoRefreshInputDto {
  @DtoProperty(AutenticacaoRefreshDtoProperties.REFRESH_REFRESH_TOKEN)
  refreshToken!: string;
}

// ======================================================

export const AUTENTICACAO_REFRESH = createDtoOperationOptions({
  description: 'Realiza o login por meio do refreshToken no sistema e retorna as credenciais de acesso.',

  gql: {
    name: 'autenticacaoLogin',

    inputDtoType: () => AutenticacaoRefreshInputDto,
    inputDtoValidationContract: AutenticacaoRefreshDtoValidationContract,

    returnType: () => AutenticacaoLoginResultDto,
  },

  swagger: {
    inputBodyType: AutenticacaoRefreshInputDto,
    inputBodyValidationContract: AutenticacaoRefreshDtoValidationContract,

    returnType: AutenticacaoLoginResultDto,
  },
});
