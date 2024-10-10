import type * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, DeepPartial, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TurmaEntity } from "../ensino";

@Entity("turma_disponibilidade")
export class TurmaDisponibilidadeEntity implements LadesaTypings.TurmaDisponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: Date | null;

  //Chaves Estrangeiras

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: "id_turma_fk" })
  turma!: LadesaTypings.Turma;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
