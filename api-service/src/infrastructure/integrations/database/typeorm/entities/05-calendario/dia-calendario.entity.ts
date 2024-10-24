import * as PocTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";

@Entity("dia_calendario")
export class DiaCalendarioEntity implements PocTypings.DiaCalendario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "data", type: "date", nullable: false })
  data!: Date;

  @Column({ name: "dia_letivo", type: "bool", nullable: false })
  diaLetivo!: boolean;

  @Column({ name: "feriado", type: "bool", nullable: false })
  feriado!: boolean;

  //Chaves Estrangeiras

  @ManyToOne(() => CalendarioLetivoEntity)
  @JoinColumn({ name: "id_calendario_letivo_fk" })
  calendario!: PocTypings.CalendarioLetivo;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
