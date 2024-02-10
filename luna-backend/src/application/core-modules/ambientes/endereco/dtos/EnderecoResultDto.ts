import { ObjectType } from '@nestjs/graphql';
import { EnderecoInputDto } from './EnderecoInputDto';

@ObjectType('EnderecoResultDto')
export class EnderecoResultDto extends EnderecoInputDto {}
