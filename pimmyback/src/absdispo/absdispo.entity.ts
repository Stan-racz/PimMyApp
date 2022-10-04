import { User } from 'src/user/models/user.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Absence } from '../absences/absence.entity';
import { UserEntity } from '../user/models/user.entity';

@Entity("abs_dispo")
export class Abs_dispo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  compteur: number;

  @ManyToOne(type => UserEntity)
  @JoinColumn({ name: 'id_util' })
  id_util: UserEntity;

  @ManyToMany(type => Absence)
  @JoinTable({ name: 'id_abs' })
  id_abs: Absence;

}