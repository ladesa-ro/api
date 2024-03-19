import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IEntityDate } from '../../../../../application/business/(spec)';
import { ArquivoEntity } from './arquivo.entity';
import { ImagemEntity } from './imagem.entity';

@Entity('imagem_arquivo')
export class ImagemArquivoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'largura', type: 'int', nullable: false })
  largura!: number;

  @Column({ name: 'altura', type: 'int', nullable: false })
  altura!: number;

  @Column({ name: 'formato', type: 'text', nullable: false })
  formato!: string;

  @Column({ name: 'mime_type', type: 'text', nullable: false })
  mimeType!: string;

  //

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_fk' })
  imagem!: ImagemEntity;

  @ManyToOne(() => ArquivoEntity)
  @JoinColumn({ name: 'id_arquivo_fk' })
  arquivo!: ArquivoEntity;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;
}
