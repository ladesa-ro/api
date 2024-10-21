import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervaloDeTempoEntity } from "../calendario";
import { DiarioProfessorEntity } from "../ensino";
import { HorarioGeradoEntity } from "./horario-gerado.entity";

@Entity("horario_gerado_dia")
export class HorarioGeradoAulaEntity implements PocTypings.HorarioGeradoAula {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "dia_semana_iso", type: "int", nullable: true })
  diaSemanaIso!: number;

  //

  @ManyToOne(() => DiarioProfessorEntity)
  @JoinColumn({ name: "id_diario_professor_fk" })
  diarioProfessor!: PocTypings.DiarioProfessorFindOneResult | null;

  @ManyToOne(() => HorarioGeradoEntity)
  @JoinColumn({ name: "id_horario_gerado_fk" })
  horarioGerado!: PocTypings.HorarioGeradoFindOneResult;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: PocTypings.IntervaloDeTempoFindOneResult;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
