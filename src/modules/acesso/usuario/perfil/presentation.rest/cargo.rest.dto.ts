import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiSchema } from "@/shared/presentation/rest";
import { PaginationInputRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import { paginationInputSchema } from "@/shared/validation/schemas";

@ApiSchema({ name: "CargoCreateInputDto" })
export class CargoCreateInputRestDto {
  @ApiProperty({ description: "Nome do cargo", example: "Professor" })
  nome!: string;
}

@ApiSchema({ name: "CargoUpdateInputDto" })
export class CargoUpdateInputRestDto {
  @ApiPropertyOptional({ description: "Nome do cargo", example: "Professor Coordenador" })
  nome?: string;
}

@ApiSchema({ name: "CargoOutputDto" })
export class CargoOutputRestDto {
  @ApiProperty({ description: "ID do cargo", format: "uuid" })
  id!: string;

  @ApiProperty({ description: "Nome do cargo", example: "Professor" })
  nome!: string;
}

@ApiSchema({ name: "CargoListOutputDto" })
export class CargoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CargoOutputRestDto] })
  data!: CargoOutputRestDto[];
}

@ApiSchema({ name: "CargoListInputDto" })
export class CargoListInputRestDto extends PaginationInputRestDto {
  // Habilita validação via ZodGlobalValidationPipe, incluindo coerção de tipo
  // e limites de paginação (page >= 1, limit entre 1 e 100).
  static schema = paginationInputSchema;
}
