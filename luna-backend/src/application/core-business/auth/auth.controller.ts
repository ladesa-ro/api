import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IClientAccess } from '../../../domain';
import { ClientAccessHttp } from '../../../infrastructure';
import { AuthService } from './auth.service';

@ApiTags('Autenticação')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/whoami')
  @ApiBearerAuth()
  getWhoAmI(@ClientAccessHttp() clientAccess: IClientAccess) {
    return this.authService.getWhoAmI(clientAccess);
  }
}
