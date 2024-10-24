import * as PocTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ImagemEntity } from "../00-00-base/imagem.entity";
import { AmbienteEntity } from "../02-ambientes/ambiente.entity";
import { DisciplinaEntity } from "../04-ensino-institucional/disciplina.entity";
import { CalendarioLetivoEntity } from "../05-calendario";
import { TurmaEntity } from "./turma.entity";

@Entity("diario")
export class DiarioEntity implements PocTypings.Diario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "ativo", type: "boolean", nullable: false })
  ativo!: boolean;
  //

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendarioLetivo!: CalendarioLetivoEntity;

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: TurmaEntity;

  @ManyToOne(() => DisciplinaEntity)
  @JoinColumn({ name: "id_disciplina_fk" })
  disciplina!: DisciplinaEntity;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: "id_ambiente_padrao_fk" })
  ambientePadrao!: AmbienteEntity | null;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: "id_imagem_capa_fk" })
  imagemCapa!: ImagemEntity | null;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
