import { IEntityDate } from '@sisgea/spec';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImagemArquivoEntity } from './imagem_arquivo.entity';

@Entity('arquivo')
export class ArquivoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: true })
  nome!: string | null;

  @Column({ name: 'mime_type', type: 'text', nullable: true })
  mimeType!: string | null;

  @Column({ name: 'size_bytes', type: 'int', nullable: true })
  sizeBytes!: number | null;

  @Column({ name: 'storage_type', type: 'text', nullable: true })
  storageType!: string | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;

  //

  @OneToMany(() => ImagemArquivoEntity, (row) => row.arquivo)
  imagemArquivo!: ImagemArquivoEntity[];
}
