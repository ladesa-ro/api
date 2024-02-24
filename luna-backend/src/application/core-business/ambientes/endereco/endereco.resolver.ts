import { Resolver } from '@nestjs/graphql';
import { EnderecoDto } from './dtos';
import { EnderecoService } from './endereco.service';

@Resolver(() => EnderecoDto)
export class EnderecoResolver {
  constructor(
    //
    private _enderecoService: EnderecoService,
  ) {}
}
