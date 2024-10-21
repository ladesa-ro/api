import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervaloDeTempoEntity } from "../calendario";
import { DisponibilidadeProfessorEntity } from "./disponibilidade-professor.entity";

@Entity("disponibilidade_professor_dia")
export class DisponibilidadeProfessorDiaEntity implements PocTypings.DisponibilidadeProfessorDia {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "dia_semana_iso", type: "int", nullable: false })
  diaSemanaIso!: number;

  //

  @ManyToOne(() => DisponibilidadeProfessorEntity)
  @JoinColumn({ name: "id_disponibilidade_professor_fk" })
  disponibilidade!: PocTypings.DisponibilidadeProfessorFindOneResult;

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
