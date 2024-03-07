import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Olá, Mundo!',
    schema: {
      type: 'object',
      properties: {
        service: {
          type: 'string',
          enum: ['sisgea-luna-backend'],
          description: 'O nome desta aplicação.',
        },
        status: {
          type: 'string',
          enum: ['up'],
          description: 'Status desta aplicação.',
        },
      },
      required: ['service', 'status'],
    },
  })
  getHello() {
    return this.appService.getHello();
  }
}
