import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Base")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Olá, Mundo!",
    schema: {
      type: "object",
      properties: {
        service: {
          type: "string",
          enum: ["@ladesa-ro/api.service"],
          description: "O nome desta aplicação.",
        },
        status: {
          type: "string",
          enum: ["up"],
          description: "Status desta aplicação.",
        },
        prefix: {
          description: "Prefixo do serviço API.",
          oneOf: [{ type: "string" }, { type: "null" }],
        },
        version: {
          description: "Versão do serviço API.",
          oneOf: [{ type: "string" }],
        },
      },
      required: ["service", "status", "version"],
    },
  })
  getHello() {
    return this.appService.getHello();
  }
}
