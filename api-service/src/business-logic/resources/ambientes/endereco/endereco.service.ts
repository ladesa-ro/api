import { QbEfficientLoad } from "@/business-logic/standards/ladesa-spec/QbEfficientLoad";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import { GetEnderecoInputSchema } from "./endereco.dtos";

// ============================================================================

const aliasEndereco = "endereco";

// ============================================================================

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContextService) {}

  //

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  //

  async internalFindOneById(id: PocTypings.Endereco["id"]) {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: id,
      },
    });

    return endereco;
  }

  async internalFindOneByIdStrict(id: PocTypings.Endereco["id"]) {
    const endereco = await this.internalFindOneById(id);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: PocTypings.Endereco["id"] | null, payload: PocTypings.EnderecoInput) {
    const enderecoInputSchema = GetEnderecoInputSchema();
    const dto = await enderecoInputSchema.validate(payload, {
      stripUnknown: true,
    });

    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = {
      ...pick(dto, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]),

      cidade: {
        id: dto.cidade.id,
      },
    } as PocTypings.EnderecoInput;

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  //

  async findById(accessContext: AccessContext, dto: PocTypings.EnderecoFindOneInputView, selection?: string[] | boolean): Promise<PocTypings.EnderecoFindOneResult | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    // =========================================================

    await accessContext.applyFilter("endereco:find", qb, aliasEndereco, null);

    // =========================================================

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(PocTypings.Tokens.Endereco.Views.FindOneResult, qb, aliasEndereco, selection);

    // =========================================================

    const endereco = await qb.getOne();

    // =========================================================

    return endereco;
  }

  async findByIdStrict(requestContext: AccessContext, dto: PocTypings.EnderecoFindOneInputView) {
    const endereco = await this.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
