import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { CampusEntity } from "../ambientes/campus.entity";
import { ModalidadeEntity } from "./modalidade.entity";

@Entity("campus_possui_modalidade")
export class CampusPossuiModalidadeEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @ManyToOne(
    () => CampusEntity,
    (campus) => campus.campusPossuiModalidade,
  )
  @JoinColumn({ name: "id_campus_fk" })
  campus!: Relation<CampusEntity>;

  @ManyToOne(
    () => ModalidadeEntity,
    (modalidade) => modalidade.campusPossuiModalidade,
  )
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: Relation<ModalidadeEntity>;

  //
}
