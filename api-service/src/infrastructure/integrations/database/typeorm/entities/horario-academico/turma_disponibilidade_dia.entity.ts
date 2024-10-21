import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervaloDeTempoEntity } from "../calendario";
import { TurmaDisponibilidadeEntity } from "./turma_disponibilidade.entity";

@Entity("turma_disponibilidade_dia")
export class TurmaDisponibilidadeDiaEntity implements PocTypings.TurmaDisponibilidadeDia {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "dia_semana_iso", type: "int", nullable: false })
  diaSemanaIso!: number;

  //Chaves Estrangeiras

  @ManyToOne(() => TurmaDisponibilidadeEntity)
  @JoinColumn({ name: "id_turma_disponibilidade_fk" })
  turmaDisponibilidade!: PocTypings.TurmaDisponibilidade;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: PocTypings.IntervaloDeTempo;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
