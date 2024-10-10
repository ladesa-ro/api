import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GerarHorarioService } from "./gerar-horario.service";

@ApiTags("Gerar Horario")
@Controller("/gerar-horario")
export class GerarHorarioController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  //

  @Get("/")
  async modalidadeFindAll() {
    return this.gerarHorarioService.publishMessage();
  }
  //
}
