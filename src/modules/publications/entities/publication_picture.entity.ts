import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Publication } from './publication.entity';

@Entity('publication_pictures')
export class PublicationPicture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publication_picture: string;

  @Column({ name: 'publication_id' })
  publication_id: string;

  @ManyToOne(
    () => Publication,
    (publication) => publication.publication_pictures,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'publication_id' })
  publication: Publication;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at: Date;
}
