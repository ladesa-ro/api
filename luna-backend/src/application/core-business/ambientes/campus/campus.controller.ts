import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CampusService } from './campus.service';

@ApiTags('ambientes')
@Controller('/campi')
export class CampusController {
  constructor(private campusService: CampusService) {}
}
