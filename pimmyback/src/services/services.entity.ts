import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("services")
export class Services {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  nom: string;

  @Column("text")
  manager_Nom: string;

  @Column("text")
  manager_Prenom: string;

}