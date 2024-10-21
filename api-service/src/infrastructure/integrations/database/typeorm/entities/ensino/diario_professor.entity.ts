import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VinculoEntity } from "../autenticacao/vinculo.entity";
import { DiarioEntity } from "./diario.entity";

@Entity("diario_professor")
export class DiarioProfessorEntity implements PocTypings.DiarioProfessor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "situacao", type: "bool", nullable: false })
  situacao!: boolean;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: "id_diario_fk" })
  diario!: PocTypings.Diario;

  @ManyToOne(() => VinculoEntity)
  @JoinColumn({ name: "id_vinculo_professor_fk" })
  vinculo!: PocTypings.Vinculo;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
