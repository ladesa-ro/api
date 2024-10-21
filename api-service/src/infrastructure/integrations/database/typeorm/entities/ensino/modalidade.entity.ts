import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CampusPossuiModalidadeEntity } from "./campus_possui_modalidade.entity";

@Entity("modalidade")
export class ModalidadeEntity implements PocTypings.Modalidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "nome", type: "text", nullable: false })
  nome!: string;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  //

  @OneToMany(
    () => CampusPossuiModalidadeEntity,
    (campusPossuiModalidade) => campusPossuiModalidade.modalidade,
  )
  campusPossuiModalidade!: CampusPossuiModalidadeEntity[];

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
