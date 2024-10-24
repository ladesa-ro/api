import { IntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities/00-00-base";
import * as PocTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DisponibilidadeEntity } from "./disponibilidade.entity";

@Entity("disponibilidade_dia")
export class DisponibilidadeDiaEntity implements PocTypings.DisponibilidadeDia {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "rrule", type: "text", nullable: false })
  rrule!: string;

  //

  @ManyToOne(() => DisponibilidadeEntity)
  @JoinColumn({ name: "id_disponibilidade__fk" })
  disponibilidade!: PocTypings.DisponibilidadeFindOneResultView;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: "id_intervalo_de_tempo_fk" })
  intervaloDeTempo!: PocTypings.IntervaloDeTempoFindOneResultView;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
