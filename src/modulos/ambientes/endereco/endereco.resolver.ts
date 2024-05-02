import { Resolver } from '@nestjs/graphql';
import { EnderecoService } from './endereco.service';
import { EnderecoDto } from './endereco.dtos';

@Resolver(() => EnderecoDto)
export class EnderecoResolver {
  constructor(
    //
    private _enderecoService: EnderecoService,
  ) {}
}
