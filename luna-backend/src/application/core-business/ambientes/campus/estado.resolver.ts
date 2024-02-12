import { Resolver } from '@nestjs/graphql';
import { CampusService } from './campus.service';

@Resolver()
export class CampusResolver {
  constructor(
    //
    private campusService: CampusService,
  ) {}
}
