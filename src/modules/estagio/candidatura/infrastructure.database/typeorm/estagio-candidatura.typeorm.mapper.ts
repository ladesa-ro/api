import { dateToISO, dateToISONullable } from "@/infrastructure.database/typeorm/mapping/utils";
import { createMapper } from "@/shared/mapping";
import { EstagioCandidatura } from "../../domain/estagio-candidatura";
import { EstagioCandidaturaTypeormEntity } from "./estagio-candidatura.typeorm.entity";

export const EstagioCandidaturaTypeormMapper = {
  entityToDomain: createMapper<EstagioCandidaturaTypeormEntity, any>((entity) => ({
    id: entity.id,
    estagio: { id: entity.estagio.id },
    estagiario: { id: entity.estagiario.id },
    situacao: entity.situacao,
    // Conversão explícita de Date → ISO string: o TypeORM retorna objetos Date
    // para colunas timestamp, mas o domínio exige string (ISO 8601).
    dataInscricao: dateToISO(entity.dataInscricao),
    dataOferta: dateToISONullable(entity.dataOferta),
    expiraEm: dateToISONullable(entity.expiraEm),
    dataResposta: dateToISONullable(entity.dataResposta),
    dataCancelamento: dateToISONullable(entity.dataCancelamento),
    autorConvocacao: entity.autorConvocacao ? { id: entity.autorConvocacao.id } : null,
    motivoCancelamento: entity.motivoCancelamento,
    dateCreated: dateToISO(entity.dateCreated),
    dateUpdated: dateToISO(entity.dateUpdated),
    dateDeleted: dateToISONullable(entity.dateDeleted),
  })),

  domainToPersistence: createMapper<EstagioCandidatura, Partial<EstagioCandidaturaTypeormEntity>>(
    (domain) => ({
      id: domain.id,
      estagio: { id: domain.estagio.id } as any,
      estagiario: { id: domain.estagiario.id } as any,
      situacao: domain.situacao,
      dataInscricao: domain.dataInscricao,
      dataOferta: domain.dataOferta,
      expiraEm: domain.expiraEm,
      dataResposta: domain.dataResposta,
      dataCancelamento: domain.dataCancelamento,
      autorConvocacao: domain.autorConvocacao ? ({ id: domain.autorConvocacao.id } as any) : null,
      motivoCancelamento: domain.motivoCancelamento,
      dateCreated: domain.dateCreated,
      dateUpdated: domain.dateUpdated,
      dateDeleted: domain.dateDeleted,
    }),
  ),
};
