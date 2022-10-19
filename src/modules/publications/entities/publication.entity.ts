import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypePublication, TypeSex } from '../dto/create-publication.dto';
import { Geometry } from 'geojson';
import { GeometryTransformer } from 'src/utils/GeometryTransformer';
import { PublicationPicture } from './publication_picture.entity';

@Entity('publications')
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => User, (user) => user.publications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.publication, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(
    () => PublicationPicture,
    (publicationPicture) => publicationPicture.publication,
    {
      cascade: true,
    },
  )
  publication_pictures: PublicationPicture[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pet_name: string;

  @Column()
  type: TypePublication;

  @Column()
  sex: TypeSex;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    transformer: new GeometryTransformer(),
    name: 'last_location',
  })
  last_location: Geometry;

  @Column({ type: 'datetime' })
  disappearance_date: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at: Date;
}
