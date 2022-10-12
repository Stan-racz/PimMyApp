import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Absence } from '../absences/absence.entity';
import { UserEntity } from '../user/models/user.entity';

@Entity("DemandeAbsEntity")
export class DemandeAbsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("date")
  date_deb: Date;

  @Column("bool")
  deb_mat: boolean;

  @Column("date")
  date_fin: Date;

  @Column("bool")
  fin_mat: boolean;

  @Column("text")
  commentaire: string;

  @Column("bool")
  manager_ok: boolean;

  @Column("bool")
  admin_ok: boolean;

  @Column("int")
  id_absence: number;

  @Column("int")
  id_utilisateur: number;
}