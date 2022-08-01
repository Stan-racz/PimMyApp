import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { HeuresSemaine } from './heuressemaine.entity';
import { Services } from './services.entity';

@Entity("utilisateur")
export class Utilisateur {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  nom: string;

  @Column("text")
  prenom: string;

  @Column("text")
  email: string;

  @Column("text")
  civilite: string;

  @Column("text")
  status: string;

  @Column("text")
  dateNaiss: string;

  @Column("int")
  nbHeureContractuelle: number;

  @Column("text")
  password: string;

  @ManyToOne(type => Services)
  @JoinTable({name: 'id_service'})
  id_service: Services;

  @ManyToMany(type => HeuresSemaine)
  @JoinTable({name: 'id_nbHSem'})
  id_nbHSem: HeuresSemaine;
}