import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VinculoEntity } from "../autenticacao";

@Entity("disponibilidade_professor")
export class DisponibilidadeProfessorEntity implements PocTypings.DisponibilidadeProfessor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "data_inicio", type: "date", nullable: false })
  dataInicio!: Date;

  @Column({ name: "data_fim", type: "date", nullable: true })
  dataFim!: Date | null;

  @ManyToOne(() => VinculoEntity)
  @JoinColumn({ name: "id_vinculo_professor_fk" })
  vinculoProfessor!: PocTypings.VinculoFindOneResult;
  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
