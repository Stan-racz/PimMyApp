import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Absence } from './absence.entity';
import { Utilisateur } from './utilisateur.entity';

@Entity("abs_dispo")
export class Abs_dispo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  compteur: number;

  @ManyToOne(type => Utilisateur)
  @JoinColumn({name: 'id_util'})
  id_util: Utilisateur;

  @ManyToMany(type => Absence)
  @JoinTable({name: 'id_abs'})
  id_abs: Absence;
  
}