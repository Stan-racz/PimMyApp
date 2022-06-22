import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Absence } from './absence.entity';
import { Utilisateur } from './utilisateur.entity';

@Entity("demande_abs")
export class Demande_abs {
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
  
  @Column("text")
  status: string;

  @ManyToMany(type => Utilisateur)
  @JoinTable({name: 'id_util'})
  id_util: Utilisateur;

  @ManyToMany(type => Absence)
  @JoinTable({name: 'id_abs'})
  id_abs: Absence;
}