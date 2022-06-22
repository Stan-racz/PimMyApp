import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity("heuresSemaine")
export class HeuresSemaine {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  nbHeures: number;

  @ManyToMany(type => Utilisateur)
  @JoinTable({name: 'id_util'})
  id_util: Utilisateur;

  @Column("int")
  dateSemaine: number;
}