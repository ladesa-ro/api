import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IEntityDate } from '../../../../../application/business/(spec)';
import { ImagemArquivoEntity } from './imagem_arquivo.entity';

@Entity('imagem')
export class ImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao!: string | null;

  //

  @OneToMany(() => ImagemArquivoEntity, (entity) => entity.imagem, { cascade: true })
  imagemArquivo!: ImagemArquivoEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
