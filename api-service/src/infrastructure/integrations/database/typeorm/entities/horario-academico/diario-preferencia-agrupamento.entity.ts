import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervaloDeTempoEntity } from "../calendario";
import { DiarioEntity } from "../ensino";

@Entity("diario_preferencia_agrupamento")
export class DiarioPreferenciaAgrupamentoEntity implements PocTypings.DiarioPreferenciaAgrupamento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "dia_semana_iso", type: "int", nullable: false })
  diaSemanaIso!: number;

  @Column({ name: "aulas_seguidas", type: "int", nullable: false })
  aulasSeguidas!: number;

  @Column({ name: "data_inicio", type: "timestamptz", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "timestamptz", nullable: true })
  dataFim!: Date | null;

  //

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: PocTypings.IntervaloDeTempoFindOneResult;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: PocTypings.DiarioFindOneResult;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
