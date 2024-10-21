import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AmbienteEntity } from "../ambientes/ambiente.entity";
import { BlocoEntity } from "../ambientes/bloco.entity";
import { UsuarioEntity } from "../autenticacao/usuario.entity";
import { ImagemArquivoEntity } from "./imagem_arquivo.entity";

@Entity("imagem")
export class ImagemEntity implements PocTypings.Imagem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "descricao", type: "text", nullable: true })
  descricao!: string;

  //

  @OneToMany(
    () => ImagemArquivoEntity,
    (entity) => entity.imagem,
    { cascade: true },
  )
  versoes!: ImagemArquivoEntity[];

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;

  //

  @OneToMany(
    () => BlocoEntity,
    (row) => row.imagemCapa,
  )
  blocoCapa!: BlocoEntity[];

  @OneToMany(
    () => AmbienteEntity,
    (entity) => entity.imagemCapa,
  )
  ambienteCapa!: AmbienteEntity[];

  @OneToMany(
    () => UsuarioEntity,
    (entity) => entity.imagemCapa,
  )
  usuarioCapa!: UsuarioEntity[];

  @OneToMany(
    () => UsuarioEntity,
    (entity) => entity.imagemPerfil,
  )
  usuarioPerfil!: UsuarioEntity[];
}
