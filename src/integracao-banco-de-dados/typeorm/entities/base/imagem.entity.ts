import { IEntityDate, IImagemModel } from '@sisgea/spec';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AmbienteEntity } from '../ambientes/ambiente.entity';
import { BlocoEntity } from '../ambientes/bloco.entity';
import { UsuarioEntity } from '../autenticacao/usuario.entity';
import { ImagemArquivoEntity } from './imagem_arquivo.entity';

@Entity('imagem')
export class ImagemEntity implements IImagemModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao!: string | null;

  //

  @OneToMany(() => ImagemArquivoEntity, (entity) => entity.imagem, { cascade: true })
  imagemArquivo!: ImagemArquivoEntity[];

  //

  @Column({ name: 'dateCreateOperator()d', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'dateUpdateOperator()d', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;

  //

  @OneToMany(() => BlocoEntity, (row) => row.imagemCapa)
  blocoCapa!: BlocoEntity[];

  @OneToMany(() => AmbienteEntity, (entity) => entity.imagemCapa)
  ambienteCapa!: AmbienteEntity[];

  @OneToMany(() => UsuarioEntity, (entity) => entity.imagemCapa)
  usuarioCapa!: UsuarioEntity[];

  @OneToMany(() => UsuarioEntity, (entity) => entity.imagemPerfil)
  usuarioPerfil!: UsuarioEntity[];
}
