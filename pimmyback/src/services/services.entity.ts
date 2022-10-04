import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("services")
export class Services {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("text")
  nom: string;

  @Column("text")
  manager: string;
}