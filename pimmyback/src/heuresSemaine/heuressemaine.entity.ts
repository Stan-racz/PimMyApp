import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../user/models/user.entity';

@Entity("heuresSemaine")
export class HeuresSemaine {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  nbHeures: number;

  @ManyToMany(type => UserEntity)
  @JoinTable({ name: 'id_util' })
  id_util: UserEntity;

  @Column("int")
  dateSemaine: number;
}